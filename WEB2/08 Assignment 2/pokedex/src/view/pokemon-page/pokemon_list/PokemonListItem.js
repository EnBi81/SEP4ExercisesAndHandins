import React, {useEffect, useRef} from "react";
import './PokemonListItem.css'
import {getAverageRgbOfImg} from '../ViewUtils/ImageColorTools'
import Color from "color";
import PokeBall from './poke-ball.png'
import {addCachedItemListener, cachePokemonImageColor} from "../../../model/cachePokemons";


export default function PokemonListItem({pokemon, selected = false, setSelectedPokemon, listItemAnimationNumber }){
    let pokemonId = pokemon.id;

    let [state, setState] = React.useState({
        pokemonStyle: {
            '--pokemon-simple-bg-color': '#cccccc',
            '--pokemon-simple-img-bg-color': '#838383',
            '--animation-delay-value': listItemAnimationNumber
        },
        calculatedColors: false,
        imageSrc: pokemon.image,
        isImageMissingState: 0, // 0: own image, 1: missing image, 2: found image
    });

    let { pokemonStyle } = state;

    let onClick = () => {
        setSelectedPokemon(pokemon);
    }
    let onKeyUp = e => {
        if(e.key !== 'Enter')
            return;

        onClick();
    }



    let imageRef = useRef(null);
    let pokemonListItemRef = useRef();

    function onImageLoad(){
        let imageMainColor = pokemon.bgColor === undefined ? undefined : new Color(pokemon.bgColor);

        if(imageMainColor === undefined || state.isImageMissingState === 2){ // recalculate color if a new image was found
            let imgElement = imageRef.current;
            let rgb = getAverageRgbOfImg(imgElement);

            // https://www.htmlgoodies.com/css/color-manipulation-javascript/
            imageMainColor = new Color(rgb);

            if(imageMainColor.hex() === '#000000')
                return;

            // if the color is too dark
            if(imageMainColor.lightness() < 30)
                imageMainColor = imageMainColor.lighten(1);

            // only cache the color if the image the pokemon has it's own image
            if(state.isImageMissingState !== 1)
                cachePokemonImageColor(pokemonId, imageMainColor.hex());
        }

        const bgColor = imageMainColor.darken(0.1);
        const imgBgColor = imageMainColor.lighten(0.1).saturate(1.1);

        pokemon.bgColor = imgBgColor.hex();

        setState({
            ...state,
            pokemonStyle: {
                ...pokemonStyle,
                '--pokemon-simple-bg-color': bgColor.hex(),
                '--pokemon-simple-img-bg-color': imgBgColor.hex(),
            },
            calculatedColors: true
        })
    }



    function onImageError(){
        pokemon.bgColor = '#BE8157'; // pre-calculated color for the pokeball
        setState({
            ...state,
            imageSrc: PokeBall,
            isImageMissingState: 1,
        })
        addCachedItemListener(pokemonId + '', newImage => {
            setState({
                ...state,
                imageSrc: newImage,
                isImageMissingState: 2,
            })
        });
    }


    // styling
    let selectedClass = selected ? ' pokemon-list-item-selected' : '';


    let hiddenCss = state.calculatedColors ? '' : ' pokemon-list-item-hidden';


    let pokemonName = pokemon.name;
    if(pokemonName.length > 11 && !selected)
        pokemonName = pokemonName.substring(0, 11) + '...';
    if(pokemonName.length > 20)
        pokemonName = pokemonName.substring(0, 20) + '...';

    let pokemonWidth = '';
    if(pokemonId.length === 2) pokemonWidth = ' small-width';
    else if(pokemonId.length === 3) pokemonWidth = ' medium-width';
    else if(pokemonId.length > 3) pokemonWidth = ' extra-width';

    return (
        <div className={'pokemon-list-item-outer' + selectedClass}>
            <div className={'pokemon-list-item ' + hiddenCss}
                 style={pokemonStyle}
                 onClick={onClick}
                 data-pokemon-id={pokemonId}
                 tabIndex={0}
                 onKeyUp={onKeyUp}
                 ref={pokemonListItemRef}>
                <div className="pokemon-simple-left">
                    <div className='pokemon-simple-img'>
                        <img src={state.imageSrc} onLoad={onImageLoad} onError={onImageError} ref={imageRef} alt=""/>
                    </div>
                    <div className='pokemon-simple-name'>{pokemonName}</div>
                </div>

                <div className={'pokemon-simple-id' + pokemonWidth}>
                    <span>#</span><span>{pokemonId}</span>
                </div>
            </div>
        </div>
    )
}