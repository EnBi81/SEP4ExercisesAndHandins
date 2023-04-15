import './PokemonPageBackground.css'
import {useEffect, useRef} from "react";

let lastRotatedTime = new Date().getTime();

const bgImages = [
    'bg-image1.jpg',
    'bg-image2.png',
    'bg-image4.jpg',
    'bg-image5.jpg',
    'bg-image6.jpg',
    'bg-image8.jpg',
    'bg-image9.jpg',
    'bg-image10.jpg',
]

const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
const bgImagePath = 'SEP4ExercisesAndHandins/bg-images/' + randomImage;

let documentMouseMoveEvent;

export function PokemonPageBackground(){
    let bgRef = useRef()

    function onBgLoad(){
        documentMouseMoveEvent = ev => {
            effect3dMouseMoveListener(ev, bgRef)
        };

        document.addEventListener('mousemove', documentMouseMoveEvent);
    }

    return (
        <div className={'pokemon-page-background-container'}>
            <div className="pokemon-page-background-content" ref={bgRef} onLoad={onBgLoad}>
                <img src={bgImagePath} alt=""/>
            </div>
        </div>
    )
}


function effect3dMouseMoveListener(e, htmlElementRef){
    if(htmlElementRef.current == null){
        document.removeEventListener('mousemove', documentMouseMoveEvent);
        return;
    }

    let newMilliSeconds = new Date().getTime();
    if(newMilliSeconds - lastRotatedTime < 50 )
        return;
    lastRotatedTime = newMilliSeconds;

    let mousePosX = e.clientX / window.innerWidth;
    let mousePosY = e.clientY / window.innerHeight;


    let rotateX = Math.round((mousePosX - 0.5) * 100) / 15;
    let rotateY = Math.round((mousePosY - 0.5) * 100) / 15;


    htmlElementRef.current.style.setProperty('--bg-move-x', -rotateX + 'px');
    htmlElementRef.current.style.setProperty('--bg-move-y', -rotateY + 'px');
}