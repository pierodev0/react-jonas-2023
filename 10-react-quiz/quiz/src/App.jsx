/* eslint-disable n/handle-callback-err */
import { useEffect, useReducer } from 'react'
import Error from 'src/components/Error'
import FinishedScreen from 'src/components/FinishedScreen'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Loader from 'src/components/Loader'
import Main from 'src/components/Main'
import NextButton from 'src/components/NextButton'
import Progress from 'src/components/Progress'
import Question from 'src/components/Question'
import StartScreen from 'src/components/StartScreen'
import Timer from 'src/components/Timer'
import { getQuestions } from 'src/service/quiz-service'
import { ACTIONS, STATUS } from 'src/types'
const initialState = {
  questions: [],
  status: STATUS.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}
const SECS_PER_QUESTION = 20
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DATA_RECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: STATUS.READY,
      }
    case ACTIONS.DATE_FAILED:
      return {
        ...state,
        status: STATUS.ERROR,
      }
    case ACTIONS.START:
      return {
        ...state,
        status: STATUS.ACTIVE,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case ACTIONS.NEW_ANSWER:
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      }
    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case ACTIONS.FINISH:
      return {
        ...state,
        status: STATUS.FINISHED,
        highscore: Math.max(state.points, state.highscore),
      }
    case ACTIONS.RESTART:
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: STATUS.READY,
      }
    default:
      throw new Error('Accion es desconocida')
  }
}

function App() {
  const [
    { status, questions, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)
  useEffect(() => {
    getQuestions()
      .then(data => dispatch({ type: ACTIONS.DATA_RECEIVED, payload: data }))
      .catch(err => dispatch({ type: ACTIONS.DATE_FAILED }))
  }, [])

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  )
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
            />

            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === STATUS.FINISHED && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
