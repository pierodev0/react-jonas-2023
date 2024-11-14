import { ACTIONS } from 'src/types'

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  )
}
function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null
  return (
    <div className='options'>
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctOption ? 'correct' : 'wrong'
        return (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? isCorrect : ''}`}
            key={option}
            onClick={() =>
              dispatch({ type: ACTIONS.NEW_ANSWER, payload: index })
            }
            disabled={hasAnswered}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
export default Question
