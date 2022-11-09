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
        /*const textures = {
            dirt: dirtImg,
            grass: grassImg,
            glass: glassImg,
            wood: woodImg,
            log: logImg,
        }*/
        const pressedTexture = Object.entries(textures).find(([k, v]) => v) as [keyof typeof textures, typeof textures[keyof typeof textures]]
        if (pressedTexture) {
            setTexture(pressedTexture[0])
        }
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