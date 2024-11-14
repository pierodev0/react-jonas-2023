import { ACTIONS } from 'src/types'

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className='start'>
      <h2>Welcome to The react Quiz</h2>
      <h3>{numQuestions} Question to test your react mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTIONS.START })}
      >
        Let's start
      </button>
    </div>
  )
}

export default StartScreen
