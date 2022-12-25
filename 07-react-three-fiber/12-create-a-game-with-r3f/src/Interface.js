import { useKeyboardControls } from "@react-three/drei"
import { addEffect } from "@react-three/fiber"
import { useEffect } from "react"
import { useRef } from "react"
import useGame from "./useGame"

export const Interface = () => {
  const forward = useKeyboardControls(state => state.forward)
  const backward = useKeyboardControls(state => state.backward)
  const leftward = useKeyboardControls(state => state.leftward)
  const rightward = useKeyboardControls(state => state.rightward)
  const jump = useKeyboardControls(state => state.jump)

  const time = useRef(null)

  useEffect(() => {
    const unsubscriveEffect = addEffect(() => {
      const state = useGame.getState()
      let elapsedTime = 0

      if(state.phase === 'playing') 
        elapsedTime = Date.now() - state.startTime
      else if(state.phase === 'ended')
        elapsedTime = state.endTime - state.startTime

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      if(time.current) {
        time.current.textContent = elapsedTime
      }
    })

    return () => {
      unsubscriveEffect()
    }
  }, [])

  const restart = useGame(state => state.restart)
  const phase = useGame(state => state.phase)

  return (
    <>
      <div className='interface'>
        <div ref={time} className='time'></div>

        {phase === 'ended' && <div onClick={restart} className='restart'>Restart</div>}


        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${backward ? 'active' : ''}`}></div>
                <div className={`key ${leftward ? 'active' : ''}`}></div>
                <div className={`key ${rightward ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active' : ''}`}></div>
            </div>
        </div>
      </div>
    </>
  )
}