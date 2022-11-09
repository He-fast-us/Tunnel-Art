import { useStore } from '../Hooks/useStore';
import { Cube } from './Cube';
import React from 'react';

export const Cubes = () => {
    const [cubes] = useStore((state) => [
        state.cubes
    ])
    return <>{cubes.map(({ key, pos, texture }) => {
        return (
            <Cube key={key} position={pos} texture={texture} />
        )
    })}</>
}