import create from 'zustand';
import { nanoid } from 'nanoid';
import { Triplet } from '@react-three/cannon';
import * as textures from '../Images/textures';

const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key)!)
const setLocalStorage = (key: string, value: unknown) => (window.localStorage.setItem(key, JSON.stringify(value)))

type TextureId = keyof typeof textures

type State = {
    texture: TextureId,
    cubes: Array<{ key: string, pos: Triplet, texture: TextureId }>,
    addCube: (x: number, y: number, z: number) => void,
    removeCube: (x: number, y: number, z: number) => void,
    saveWorld: () => void,
    resetWorld: () => void,
    setTexture: (texture: TextureId) => void,
}

export const useStore = create<State>((set) => ({
    texture: 'dirtTexture',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },

    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos
                return X !== x || Y !== y || Z !== z
            })
        }))
    },

    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },

    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes)
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    },
}))