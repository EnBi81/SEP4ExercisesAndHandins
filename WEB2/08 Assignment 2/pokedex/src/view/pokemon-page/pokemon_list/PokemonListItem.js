import React, {useEffect, useRef} from "react";
import './PokemonListItem.css'
import {getAverageRgbOfImg} from '../ViewUtils/ImageColorTools'
import Color from "color";
import PokeBall from './poke-ball.png'


export default function PokemonListItem({pokemon, selected = false, setSelectedPokemon }){
    // TODO onclick
    let [state, setState] = React.useState({
        pokemonStyle: {
            '--pokemon-simple-bg-color': '#cccccc',
            '--pokemon-simple-img-bg-color': '#838383',
        },
        calculatedColors: false,
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

    function onImageLoad(){
        let imgElement = imageRef.current;
        let rgb = getAverageRgbOfImg(imgElement);

        // https://www.htmlgoodies.com/css/color-manipulation-javascript/
        let imageMainColor = new Color(rgb);

        // if the color is too dark
        if(imageMainColor.lightness() < 30)
            imageMainColor = imageMainColor.lighten(1);

        const bgColor = imageMainColor.darken(0.1);
        const imgBgColor = imageMainColor.lighten(0.1).saturate(1.1);

        pokemon.bgColor = imgBgColor.hex();

        setState({
            ...state,
            pokemonStyle: {
                '--pokemon-simple-bg-color': bgColor.hex(),
                '--pokemon-simple-img-bg-color': imgBgColor.hex(),
            },
            calculatedColors: true
        })
    }

    function onImageError(){
        imageRef.current.src = PokeBall;
    }


    // styling
    let selectedClass = selected ? ' pokemon-list-item-selected' : '';

    let hiddenCss = state.calculatedColors ? '' : ' pokemon-list-item-hidden';

    let pokemonName = pokemon.name;
    if(pokemonName.length > 11 && !selected)
        pokemonName = pokemonName.substring(0, 11) + '...'

    return (
        <div className={'pokemon-list-item-outer' + selectedClass}>
            <div className={'pokemon-list-item ' + hiddenCss}
                 style={pokemonStyle}
                 onClick={onClick}
                 data-pokemon-id={pokemon.id}
                 tabIndex={2}
                 onKeyUp={onKeyUp}>
                <div className="pokemon-simple-left">
                    <div className='pokemon-simple-img'>
                        <img src={pokemon.image} onLoad={onImageLoad} onError={onImageError} ref={imageRef} alt=""/>
                    </div>
                    <div className='pokemon-simple-name'>{pokemonName}</div>
                </div>

                <div className='pokemon-simple-id'>
                    <span>#</span><span>{pokemon.id}</span>
                </div>
            </div>
        </div>
    )
}