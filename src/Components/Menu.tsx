import { useStore } from '../Hooks/useStore';
import React from 'react';

export const Menu = () => {
    const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])

    return (<div className="menu, absolute">
        <button 
            onClick={() => saveWorld()}
        >Save</button>
        <button
            onClick={() => resetWorld()}
        >Reset</button>
    </div>)
}