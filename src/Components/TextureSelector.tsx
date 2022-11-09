import { useEffect, useState } from 'react';
import { useStore } from '../Hooks/useStore';
import { useKeyboard } from '../Hooks/useKeyboard';
import { dirtImg, grassImg, glassImg, woodImg, logImg } from '../Images/images';
import React from 'react';
import * as textures from '../Images/textures';

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg
}

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
    const {
        dirt,
        grass,
        glass,
        wood,
        log,
    } = useKeyboard()

    useEffect(() => {
        const textureKeys = {
            dirtTexture: dirt,
            grassTexture: grass,
            glassTexture: glass,
            woodTexture: wood,
            logTexture: log,
        } as const

console.log(dirt, grass, glass, wood, log);

        const pressedTexture = Object.entries(textureKeys).find(([k, v]) => v) as [keyof typeof textureKeys, typeof textureKeys[keyof typeof textureKeys]]
        if (pressedTexture) {
            setTexture(pressedTexture[0])
        } console.log(pressedTexture);
    }, [setTexture, dirt, grass, glass, wood, log])

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000)
        setVisible(true)
        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    return visible ? <div className='absolute centered'>
        {Object.entries(images).map(([k, src]) => {
            return (<img
                key={k}
                src={src}
                alt={k}
                className={k === activeTexture ? 'active' : undefined}
            />)
        })}
    </div> : null
    }