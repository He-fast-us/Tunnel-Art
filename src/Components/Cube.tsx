import { useBox, Triplet } from "@react-three/cannon";
import { useState } from "react";
import { useStore } from "../Hooks/useStore";
import * as textures from "../Images/textures";
import React from 'react';

export const Cube = ({ position, texture }: { position: Triplet, texture: keyof typeof textures }) => {
    const [isHovered,setIsHovered] = useState(false) 
    const [ref] = useBox(() => ({
        type: 'Static',
        position 
    }))
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    const activeTexture = textures[texture]

    return (
        <mesh 
        onPointerMove={(e) => {
            e.stopPropagation()
            setIsHovered(true)
        }}
        onPointerOut={(e) => {
            e.stopPropagation()
            setIsHovered(false)
        }}
        onClick={(e) => {
            e.stopPropagation()
            if (typeof e.faceIndex === 'undefined' || !ref.current) {
                return
            }
            const clickedFace = Math.floor(e.faceIndex / 2)
            const {x, y, z} = ref.current.position
            if(e.altKey){
                removeCube(x, y, z)
                return
            }
            else if(clickedFace === 0) {
                addCube(x + 1, y, z)
                return
            }
            else if (clickedFace === 1) {
                addCube(x - 1, y, z)
                return 
            }
            else if (clickedFace === 2) {
                addCube(x, y + 1, z)
                return
            }
            else if (clickedFace === 3) {
                addCube(x, y - 1, z)
                return 
            }
            else if (clickedFace === 4) {
                addCube(x, y, z + 1)
                return 
            }
            else if (clickedFace === 5) {
                addCube(x, y, z - 1)
                return 
            }
        }}
        ref={ref as any}
        >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial 
                color={isHovered ? 'grey' : 'white'} 
                map={activeTexture} 
                transparent={true}
                opacity={texture === 'glassTexture' ? 0.6 : 1}
                attach="material" />
        </mesh>
    )
}