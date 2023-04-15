import './PokemonPageBackground.css'
import {useEffect, useRef} from "react";

import Image1 from './bg-images/bg-image1.jpg'
import Image2 from './bg-images/bg-image2.png'
import Image4 from './bg-images/bg-image4.jpg'
import Image5 from './bg-images/bg-image5.jpg'
import Image6 from './bg-images/bg-image6.jpg'
import Image8 from './bg-images/bg-image8.jpg'
import Image9 from './bg-images/bg-image9.jpg'
import Image10 from './bg-images/bg-image10.jpg'



let lastRotatedTime = new Date().getTime();

const bgImages = [
    Image1,
    Image2,
    Image4,
    Image5,
    Image6,
    Image8,
    Image9,
    Image10,
]

const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];

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
                <img src={randomImage} alt=""/>
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