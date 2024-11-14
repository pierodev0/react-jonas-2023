import { ACTIONS } from 'src/types'

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null
  if (index < numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTIONS.NEXT_QUESTION })}
      >
        Next
      </button>
    )

  if (index === numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTIONS.FINISH })}
      >
        Next
      </button>
    )
}

export default NextButton
