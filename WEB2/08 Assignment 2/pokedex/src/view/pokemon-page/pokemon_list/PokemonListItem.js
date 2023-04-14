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
    });

    let { pokemonStyle } = state;

    let onClick = () => {
        setSelectedPokemon(pokemon);
    }


    // styling
    let selectedClass = selected ? ' pokemon-list-item-selected' : '';

    let imageRef = useRef(null);
    let listItemRef = useRef(null);

    function onImageLoad(){
        let imgElement = imageRef.current;
        let rgb = getAverageRgbOfImg(imgElement);

        // https://www.htmlgoodies.com/css/color-manipulation-javascript/
        const imageMainColor = Color(rgb);
        const bgColor = imageMainColor.darken(0.1);
        const imgBgColor = imageMainColor.lighten(0.1).saturate(1.1);

        setTimeout(() => {
            imgElement.parentNode.parentNode.classList.remove('pokemon-list-item-hidden');
        }, 50);

        pokemon.bgColor = imgBgColor.hex();

        setState({
            ...state,
            pokemonStyle: {
                '--pokemon-simple-bg-color': bgColor.hex(),
                '--pokemon-simple-img-bg-color': imgBgColor.hex(),
            },
        })
    }

    function onImageError(){
        imageRef.current.src = PokeBall;
    }

    useEffect(() => {
        listItemRef.current.classList.add('pokemon-list-item-hidden')
    }, [])

    return (
        <div className={'pokemon-list-item ' + selectedClass}
             style={pokemonStyle}
             onClick={onClick}
             data-pokemon-id={pokemon.id}
             ref={listItemRef}>
            <div className='pokemon-simple-img'>
                <img src={pokemon.image} onLoad={onImageLoad} onError={onImageError} ref={imageRef} alt=""/>
            </div>
            <div className='pokemon-simple-data'>
                <div className='pokemon-simple-name'>{pokemon.name}</div>
                <div className='pokemon-simple-id'><span>#</span><span>{pokemon.id}</span></div>
            </div>
        </div>
    )
}