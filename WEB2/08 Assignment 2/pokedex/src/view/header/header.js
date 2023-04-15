import './header.css'
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

export function Header(){
    let headerRef = useRef();
    let [animationInfo, setAnimationInfo] = useState({
        startAnimation: false,
        timeoutValue: null,
    });

    useEffect(() => {
        if(!animationInfo.startAnimation)
            return;

        headerRef.current.classList.add('pikachu-protocol');
    }, [animationInfo.startAnimation])


    let homeMouseEnter = () => {
        const animationAfterHoverDuration = 10; // seconds

        let timeout = setTimeout(() => {
            setAnimationInfo({
                ...animationInfo,
                startAnimation: true
            })
        }, animationAfterHoverDuration * 1000);

        setAnimationInfo({
            ...animationInfo,
            timeoutValue: timeout
        });
    }

    let homeMouseLeave = () => {
        if(animationInfo.timeoutValue == null)
            return;

        clearTimeout(animationInfo.timeoutValue);
    }

    return (
        <div className={'header'}>
            <div className={'header-content'} ref={headerRef}>
                <div className="header-left">
                    <HeaderTile element={'Home'} linkTo={'/'} extraClassName={'header-pikachu pikachu-peaking'} mouseEnter={homeMouseEnter} mouseLeave={homeMouseLeave}></HeaderTile>
                    <HeaderTile element={'About us'} linkTo={'/about'} extraClassName={'pikachu-peaking'}></HeaderTile>
                </div>
                <div className="header-right">
                    <HeaderTile element={'TicTacToe'} linkTo={'/tictactoe'} extraClassName={'header-tic-tac-toe'}></HeaderTile>
                </div>
            </div>
        </div>
    )
}
function HeaderTile({element, linkTo, extraClassName, mouseEnter, mouseLeave}){
    return (
        <div className={'header-tile ' + extraClassName}>
            <Link to={linkTo} className={'header-tile-link'} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <div className={'header-tile-inner'}>
                    {element}
                </div>
                <div className="header-bg">
                    <div className="pokeball-card">
                        <div className="pokeball-card-white"></div>
                        <div className="pokeball-card-black"></div>
                        <div className="pokeball-card-red"></div>
                    </div>
                </div>
                <div className="pokeball-card-circle"></div>
            </Link>
        </div>
    );
}