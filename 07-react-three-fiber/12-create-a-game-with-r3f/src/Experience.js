import { OrbitControls } from '@react-three/drei'
import { Level } from './Level.js'
import Lights from './Lights.js'
import { Debug, Physics } from '@react-three/rapier'
import { Player } from './Player.js'
import useGame from './useGame.js'

export default function Experience()
{
    const blocksCount = useGame(state => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)

    return <>
        <color args={[ 'blue' ]} attach='background' />

        <OrbitControls makeDefault />

        <Physics>
            <Lights />

            {/* <Debug /> */}

            <Level count={blocksCount} seed={blocksSeed} />

            <Player />
        </Physics>
    </>
}