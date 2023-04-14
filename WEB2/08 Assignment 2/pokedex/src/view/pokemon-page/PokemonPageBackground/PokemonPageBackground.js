import './PokemonPageBackground.css'
import {useEffect, useRef} from "react";

function getImageLink(pokemonStyle){
    return `/styles/style_${pokemonStyle}.png`
}

let lastCssUpdate = new Date().getTime();
let lastHoveredBoxIndex = 0;

export function PokemonPageBackground({styles}){
    let backgroundRef = useRef();

    styles = ['water', 'fire', 'ice', 'rock']

    /*useEffect(() => {
        document.addEventListener('mousemove', e => {
            let newMilliSeconds = new Date().getTime();
            if(newMilliSeconds - lastCssUpdate < 50) // rate limit the css rendering, because it gets too laggy
                return;

            lastCssUpdate = newMilliSeconds;

            let yPercentage = (e.clientY - (window.innerHeight / 2)) / (window.innerHeight * 1.5);
            let xPercentage = (e.clientX - (window.innerWidth / 2)) / (window.innerWidth * 1.5);

            backgroundRef.current.style.setProperty('--percentage-x', Math.round(xPercentage * 1000) / 10 + 30);
            backgroundRef.current.style.setProperty('--percentage-y', Math.round(yPercentage * 1000) / 40 - 30);
        })
    }, [])*/

    return (
        <div className={'pokemon-page-background'} ref={backgroundRef}>
        </div>
    )
}