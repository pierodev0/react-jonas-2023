import { useEffect, useState } from 'react'
import { ACTIONS } from 'src/types'
function Timer({ secondsRemaining = 10, dispatch }) {
  const [timer, setTimer] = useState(secondsRemaining)
  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60
  useEffect(() => {
    const id = setInterval(() => {
      setTimer(timer => timer - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  if (timer === 0) dispatch({ type: ACTIONS.FINISH })
  return (
    <div className='timer'>
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </div>
  )
}

export default Timer
