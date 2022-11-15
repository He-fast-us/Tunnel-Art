import { usePlane } from '@react-three/cannon'; 
import { groundTexture } from '../Images/textures';
import { useStore } from '../Hooks/useStore';
import React from 'react';

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0]
    }))
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

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

//e.stopPropagation causes the addition of a cube to stop on the ground (can't be passed through the ground)
//note that "ground" is set at Y -0.5, half a unit down, because before that added cubes floated because the ceil (ceiling) rounded-up too high
//the [addCube] step here adds the ability to click on the ground to add a cube
