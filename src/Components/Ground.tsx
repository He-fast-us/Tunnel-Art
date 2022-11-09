import { usePlane } from '@react-three/cannon'; 
import { groundTexture } from '../Images/textures';
import { useStore } from '../Hooks/useStore';
import React from 'react';

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0]
    }))
    const [addCube] = useStore((state) => [state.addCube])

    groundTexture.repeat.set(80, 80) 

    return (
        <mesh 
        onClick={(e) => {
            e.stopPropagation()
            const [x, y, z] = Object.values(e.point).map(Math.ceil)
            addCube(x, y, z)
        }}
        ref={ref as any}>
            <planeBufferGeometry attach= 'geometry' args={[100, 100]} />
            <meshStandardMaterial attach= 'material' map= {groundTexture} />
        </mesh>
    )
 
}
