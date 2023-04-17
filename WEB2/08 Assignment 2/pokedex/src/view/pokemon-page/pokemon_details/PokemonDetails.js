import React, {useEffect, useRef, useState} from "react";
import './PokemonDetails.css'
import './PokemonDetailsLoading.css'
import Color from "color";
import {PokemonExtendedInfoContainer} from "./PokemonDetailsBottom";
import {getPokemonDetailedObject} from '../../../model/pokemon-detailed-model';
import PokemonArrow from './pokemon-arrows/pokemon-arrow1.png'
import PokemonSettingsImage from './icons/pokemon-settings-small.png'
import PokeballGif from './pokeball-big.png'


let lastRotatedTime = new Date().getTime();

export default function PokemonDetails({ pokemonToShow, setPokemonToShow, pageNavigation, apiDataResponse, loadingInfo }){

    let layer1Ref = useRef();
    let [pokemonDetailedState, setPokemonDetailedState] = useState({
        pokemonDetailed: undefined,
        loadingState: 0,
        loadingTimeOut: null,
    });

    let pokemonDetailedStyle = getColorCssObject(pokemonToShow?.bgColor);

    // cancel loading
    if(pokemonToShow === undefined && pokemonDetailedState.loadingTimeOut != null){
        clearTimeout(pokemonDetailedState.loadingTimeOut);
        setPokemonDetailedState({
            ...pokemonDetailedState,
            loadingState: 0,
            loadingTimeOut: null,
        });
    }

    // Making get request to the api
    useEffect(() => {
        if(pokemonToShow === undefined){
            setPokemonDetailedState({
                ...pokemonDetailedState,
                pokemonDetailed: undefined,
                loadingState: 0,
            });
            return;
        }

        if(pokemonDetailedState.loadingState !== 2){
            setPokemonDetailedState({
                ...pokemonDetailedState,
                loadingState: 1,
            })
        }


        getPokemonDetailedObject(pokemonToShow.id)
            .then(pokemon => {
                let loadFunction = () => setPokemonDetailedState({
                    ...pokemonDetailedState,
                    pokemonDetailed: pokemon,
                    loadingState: 2,
                    loadingTimeOut: null,
                });

                if(pokemonDetailedState.loadingState === 0 || pokemonDetailedState.loadingState === 4){
                    let timeout = setTimeout(loadFunction, 1000); // set timeout just to show that fancy loading animation

                    setPokemonDetailedState({
                        ...pokemonDetailedState,
                        loadingTimeOut: timeout,
                        loadingState: 1,
                    })
                }
                else{
                    if(pokemonDetailedState.loadingTimeOut != null){
                        clearTimeout(pokemonDetailedState.loadingTimeOut);
                    }
                    loadFunction();
                }
            })
            .catch(() => {
                if(pokemonDetailedState.loadingTimeOut != null)
                    clearTimeout(pokemonDetailedState.loadingTimeOut);

                setError()

                setPokemonDetailedState({
                    ...pokemonDetailedState,
                    loadingState: 0,
                    loadingTimeOut: null,
                });

                setPokemonToShow(undefined);
            });

    }, [pokemonToShow?.id]);

    // adding cool 3d mouse event
    useEffect(() => {
        layer1Ref.current.addEventListener('mousemove', e => effect3dMouseMoveListener(e, layer1Ref));
    }, [])

    let {pokemonDetailed, loadingState} = pokemonDetailedState;

    // set up loaded content
    let content = pokemonDetailed !== undefined && (
            <div className={'pokemon-details-content'}>
                <PokemonIdTitleContainer pokemonDetailed={pokemonDetailed}></PokemonIdTitleContainer>
                <PokemonImageContainer pokemonDetailed={pokemonDetailed}></PokemonImageContainer>
                <PokemonExtendedInfoContainer pokemonDetailed={pokemonDetailed}></PokemonExtendedInfoContainer>
            </div>
        );

    // unset backside
    function setBackside(debugMode){
        loadingState = debugMode ? 4 : 0;

        setPokemonDetailedState({
            ...pokemonDetailedState,
            loadingState: loadingState,
            loadingTimeOut: null,
        });
    }

    let loadingCss = '';
    if(loadingState === 0) loadingCss = ' page-navigation';
    else if(loadingState === 4) loadingCss = ' page-navigation-settings';
    else if(loadingState === 1) loadingCss = ' loading';
    else if(loadingState === 2) loadingCss = ' loaded';


    if(loadingInfo.loading && !loadingInfo.debugLoading)
        loadingCss = ' loading page-navigation'

    if(layer1Ref.current?.classList.contains('load-error'))
        loadingCss += ' load-error'

    function setError(){
        layer1Ref.current.classList.remove('load-error');
        (() => layer1Ref.current.scrollHeight)(); // no more compile warning xddd
        layer1Ref.current.classList.add('load-error');
    }


    return (
        <div className="pokemon-details-container" style={pokemonDetailedStyle}>
            <div className={'pokemon-details-content-layer-1 no-display' + loadingCss} ref={layer1Ref}>
                <LoadingScreen content={content}
                               pageNavigation={pageNavigation}
                               triggerError={() => setError()}
                               apiDataObject={apiDataResponse}
                               setBackside={setBackside}></LoadingScreen>
            </div>
        </div>
    )
}

function LoadingScreen({content, pageNavigation, triggerError, apiDataObject, setBackside}){

    let prevPageRef = useRef();
    let nextPageRef = useRef();

    function goToPreviousPage(){
        if(!pageNavigation.canGoToPreviousPage){
            triggerError();
            return;
        }

        pageNavigation.goToPreviousPage();
    }
    function goToNextPage(){
        if(!pageNavigation.canGoToNextPage){
            triggerError();
            return;
        }

        pageNavigation.goToNextPage();
    }

    function onPrevMouseDown() { prevPageRef.current.classList.add('clicking'); }
    function onNextMouseDown() { nextPageRef.current.classList.add('clicking'); }

    function onPrevMouseUp() { prevPageRef.current.classList.remove('clicking'); }
    function onNextMouseUp() { nextPageRef.current.classList.remove('clicking'); }

    let prevPageCss = pageNavigation.canGoToPreviousPage ? ' allowed' : ' disabled';
    let nextPageCss = pageNavigation.canGoToNextPage ? ' allowed' : ' disabled';

    return (
        <>
            <div className={'loading-screen'}>
                <div className={'loading-part-top'}>
                    <div className={'page-navigation-button page-navigation-button-left' + prevPageCss}
                         title={'Previous page'}
                         onClick={goToPreviousPage}
                         onMouseDown={onPrevMouseDown}
                         onMouseUp={onPrevMouseUp}
                         onMouseLeave={onPrevMouseUp}
                         ref={prevPageRef}>
                        <img src={PokemonArrow} alt=""/>
                    </div>
                    <div className={'page-navigation-button page-navigation-button-right' + nextPageCss}
                         title={'Next page'}
                         onClick={goToNextPage}
                         onMouseDown={onNextMouseDown}
                         onMouseUp={onNextMouseUp}
                         onMouseLeave={onNextMouseUp}
                         ref={nextPageRef}>
                        <img src={PokemonArrow} alt=""/>
                    </div>
                </div>
                <div className={'loading-part-mid-black'}></div>
                <div className={'loading-part-mid'}>
                    <div className="pokemon-circle">
                        <div className="pokemon-circle-black-inner">
                            <div className="pokemon-circle-spinning-animation"></div>
                            <div className="pokemon-circle-white-inner">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'loading-part-mid-black'}></div>
                <div className={'loading-part-bottom'}>
                    <div className="loading-part-bottom-settings">
                        <img src={PokemonSettingsImage} alt="" onClick={() => setBackside(true)}/>
                    </div>
                </div>
                <div className="loaded-color-bg">
                    <div className="loaded-color-bg-anim"></div>
                </div>
            </div>
            <BacksidePageSettings apiDataObject={apiDataObject} setBackside={setBackside} pageNavigation={pageNavigation}></BacksidePageSettings>
        </>
    )
}

let pokemonTitleTimeout = null;
function PokemonIdTitleContainer({pokemonDetailed}){

    let titleFullRef = useRef();

    let id = `#${pokemonDetailed.id}`;
    let name = pokemonDetailed.name;
    let nameTrimmed = name.length <= 9 ? name : name.substring(0, 8) + '...';
    let shouldAnimOnTitleHover = name.length > 9;


    let pokemonIdRef = useRef();
    let onMouseEnter = () => {
        pokemonIdRef.current.classList.remove('animation');
        (() => pokemonIdRef.current.scrollHeight)(); // trigger re-render
        pokemonIdRef.current.classList.add('animation');
    }

    let funnyTitle = '';
    if(id === '#69') funnyTitle = 'Nice';
    else if(id === '#420') funnyTitle = 'Weed haha funny number';


    let idCounter = 0;
    let titleObjects = [...id].map(c => <span key={idCounter} style={{'--transition-delay': idCounter++}}>{c}</span>);

    // calculate the title's animation speed
    useEffect(() => {
        if(!shouldAnimOnTitleHover)
            return;

        let boundingRect = titleFullRef.current.getBoundingClientRect()
        let width = boundingRect.width;

        let nameLengthSpeed = name.length * 600;
        let widthSpeed = width * 20;

        titleFullRef.current.style.setProperty('--pokemon-title-full-animation-time', Math.max(nameLengthSpeed, widthSpeed) + 'ms');
    }, [name]);


    function reStartTitleHoverAnimation(){
        pokemonTitleTimeout = setTimeout(() => {
            if(!titleFullRef.current?.classList.contains('pokemon-title-full-animation'))
                return;

            titleFullRef.current?.classList.remove('pokemon-title-full-animation');
            (() => titleFullRef.current?.scrollHeight)();
            titleFullRef.current?.classList.add('pokemon-title-full-animation');
        }, 1000) // start the animation after 1 second
    }
    function startTitleHoverAnimation(){
        if(!shouldAnimOnTitleHover)
            return;

        pokemonTitleTimeout = setTimeout(() => {
            titleFullRef.current?.classList.add('pokemon-title-full-animation');
        }, 1000) // start the animation after 1 second
    }
    function endTitleHoverAnimation(){
        if(pokemonTitleTimeout != null)
            clearTimeout(pokemonTitleTimeout);

        titleFullRef.current?.classList.remove('pokemon-title-full-animation');
    }

    return (
        <div className={'pokemon-details-grid-item pokemon-id-title-container'}>
            <div className="pokemon-id" ref={pokemonIdRef} onMouseEnter={onMouseEnter} title={funnyTitle}>
                <div className={'pokemon-id-inner'}>{titleObjects}</div>
            </div>
            <div className="pokemon-name"
                 onMouseEnter={startTitleHoverAnimation}
                 onMouseLeave={endTitleHoverAnimation}>
                <div className="pokemon-name-absolute">
                    <div className="pokemon-name-sliding" data-animation-on-hover={shouldAnimOnTitleHover ? '1' : '0'}>
                        <span className="pokemon-name-full"
                              ref={titleFullRef}
                              onAnimationEnd={reStartTitleHoverAnimation}>{name}</span>
                        {shouldAnimOnTitleHover && <span className="pokemon-name-trimmed">{nameTrimmed}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

let latestImageUrl = '';
function PokemonImageContainer({pokemonDetailed}){
    let imageUrl = pokemonDetailed.sprites.other['official-artwork'].front_default;
    imageUrl ??= pokemonDetailed.sprites.other.home.front_default;
    imageUrl ??= pokemonDetailed.sprites.other.dream_world.front_default;
    imageUrl ??= pokemonDetailed.sprites.front_default;
    imageUrl ??= PokeballGif;

    latestImageUrl = imageUrl;

    let [oldImageUrl, setOldImageUrl] = useState(imageUrl);
    let flipCardRef = useRef();

    function onMainImageLoad(imageUrlParameter){
        if(oldImageUrl === imageUrlParameter)
            return;

        if(latestImageUrl === oldImageUrl)
            return;

        flipCardRef.current.classList.add('flip');
        const flipAnimationDuration = 500;
        setTimeout(() => {
            setOldImageUrl(latestImageUrl);
        }, flipAnimationDuration / 2);
    }

    function onFlipAnimationEnd() {
        setTimeout(() => {
            flipCardRef.current.classList.remove('flip');
            flipCardRef.current.querySelector('.face.back img').src = '';
        }, 20);
    }

    return (
        <div className={'pokemon-details-grid-item pokemon-image-container'}>
            <div className={'flip-card'} ref={flipCardRef} onAnimationEnd={onFlipAnimationEnd}>
                <div className="face">{oldImageUrl !== undefined && <img src={oldImageUrl} alt="Pokemon"/>}</div>
                <div className="face back"><img src={imageUrl}
                                                alt="Pokemon"
                                                onLoad={() => onMainImageLoad(imageUrl)}/></div>
            </div>
        </div>
    )
}


function BacksidePageSettings({apiDataObject, setBackside, pageNavigation}){
    let [itemsPerPage, setItemsPerPage] = useState(apiDataObject.resultCount);
    let [currentPage, setPage] = useState(apiDataObject.currentPage);

    let itemsPerPageRef = useRef();
    let currentPageRef = useRef();

    useEffect(() => {
        setItemsPerPage(apiDataObject.resultCount);
        itemsPerPageRef.current.value = apiDataObject.resultCount;
    }, [apiDataObject.resultCount]);
    useEffect(() => {
        setPage(apiDataObject.currentPage);
        currentPageRef.current.value = apiDataObject.currentPage;
    }, [apiDataObject.currentPage]);

    let setPageData = number => {
        if(number === apiDataObject.currentPage)
            return;

        pageNavigation.setPageNumber(number);
    }

    let setItemsPerPageData = number => {
        if(number === apiDataObject.resultCount)
            return;

        pageNavigation.setItemsPerPage(number);
    }

    return (
        <div className="backside-settings-container">
            <div className="backside-settings-content">
                <div className="backside-title backside-box">Debug mode</div>
                <div className={'backside-box'}>
                    Warning: Use debug mode at your <b>own risk</b>
                </div>
                <div className={'backside-box'}>Pokemon count: {apiDataObject.count}</div>
                <div className={'backside-box'}>Pokemon previous url: {apiDataObject.previous}</div>
                <div className={'backside-box'}>Pokemon next url: {apiDataObject.next}</div>
                <div className={'backside-box'}>Page: {apiDataObject.currentPage} / {apiDataObject.pageCount}</div>
                <div className={'backside-box'}>
                    <label>
                        Go to page:
                        <input type={'number'} min={1} max={apiDataObject.pageCount} defaultValue={currentPage + ''} onChange={e => setPage(parseInt(e.target.value))} ref={currentPageRef}/>
                    </label>
                    <button onClick={() => setPageData(currentPage)}>Apply</button>
                </div>
                <div className={'backside-box'}>Items per page: {apiDataObject.resultCount}</div>
                <div className={'backside-box'}>
                    <label>
                        Items per page:
                        <input type={'number'} min={1} max={200} defaultValue={itemsPerPage + ''} onChange={e => setItemsPerPage(parseInt(e.target.value))} ref={itemsPerPageRef}/>
                    </label>
                    <button onClick={() => setItemsPerPageData(itemsPerPage)}>Apply</button>
                </div>
                <br/>
                <div className={'backside-box'}>
                    Go back: <button onClick={() => setBackside(false)}>Flip this thing back</button>
                </div>
            </div>
        </div>
    );
}


function getColorCssObject(color){
    let pokemonDetailedStyle = {}

    // handling colors
    if(color !== undefined){
        let mainPokemonColor = new Color(color);

        // some color correct, because the '--pokemon-detailed-main-color' was too bright or too dark,
        // so we check it with if statements
        let colorLightness = mainPokemonColor.lightness();
        let colorLightenRation;

        if(colorLightness > 65)
            colorLightenRation = 0.2
        else if(colorLightness < 52)
            colorLightenRation = 0.6
        else
            colorLightenRation = 0.4

        pokemonDetailedStyle = {
            '--pokemon-detailed-main-color': mainPokemonColor.lighten(colorLightenRation),
            '--pokemon-detailed-secondary-color': mainPokemonColor.darken(0.4),
            '--pokemon-detailed-mid-color': mainPokemonColor,
            '--pokemon-detailed-ultra-dark': mainPokemonColor.darken(0.75),
        }
    }

    return pokemonDetailedStyle;
}

function effect3dMouseMoveListener(e, layer1Ref){
    let newMilliSeconds = new Date().getTime();
    if(newMilliSeconds - lastRotatedTime < 50 )
        return;
    lastRotatedTime = newMilliSeconds;

    let layer1BoundingRect = layer1Ref.current.getBoundingClientRect();
    let mousePosX = (e.clientX - layer1BoundingRect.left) / layer1BoundingRect.width;
    let mousePosY = (e.clientY - layer1BoundingRect.top) / layer1BoundingRect.height;


    let rotateX = Math.round((mousePosX - 0.5) * 100) / 10;
    let rotateY = Math.round((mousePosY - 0.5) * 100) / 10;

    layer1Ref.current?.style.setProperty('--layer1-rotate-x', rotateY + 'deg');
    layer1Ref.current?.style.setProperty('--layer1-rotate-y', -rotateX + 'deg');
}

