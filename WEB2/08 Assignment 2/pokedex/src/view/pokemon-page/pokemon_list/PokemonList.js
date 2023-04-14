import React, {useEffect} from "react";
import {pokemonSimple} from "../../../model";
import PokemonListItem from "./PokemonListItem";
import MouseGrabScroll from "../ViewUtils/MouseGrabScroll";
import SmoothOverscroll from "../ViewUtils/SmoothOverscroll";
import ScrollHeightHelper from "../ViewUtils/ScrollHeightHelper";
import './PokemonList.css'
import Color from "color";
import {findRenderedComponentWithType} from "react-dom/test-utils";

// this will help us do the hue ordering easter egg
let easterEggArray = [];
let pokemonColorOrderingState = false;

export default function PokemonList({ pokemonList, pokemonDetailedUrl, setPokemonDetailed }){

    let [state, setState] = React.useState({
        mouseGrabScroll: new MouseGrabScroll('pokemon-list'),
        smoothOverscroll: new SmoothOverscroll(),
        scrollHeightHelper: new ScrollHeightHelper(),
        pokemonColorOrdering: false,
    })

    useEffect(() => {
        let container = document.querySelector('.pokemon-list');
        let content = document.querySelector('.pokemon-list-content');

        state.smoothOverscroll.initContainer(container, content);
        state.scrollHeightHelper.init(container, content);

    },[]);

    useEffect(() => {
        state.scrollHeightHelper.onScrollListener()
    }, [pokemonList])

    function setOppositeEasterEggState(){
        pokemonColorOrderingState = !pokemonColorOrderingState;
        setState({
            ...state,
            pokemonColorOrdering: pokemonColorOrderingState
        })
    }
    useEffect(() => {
        document.addEventListener('keypress', ev => {
            if(easterEggArray.length >= 3)
                easterEggArray.shift();
            easterEggArray.push(ev.key);

            if(easterEggArray.toLocaleString() === 'h,u,e'){
                setOppositeEasterEggState()
            }
        });
    }, [])



    let pokemonListItems = undefined;
    if(pokemonList !== undefined){

        // sort the pokemons by color
        pokemonList = [...pokemonList]
        if(state.pokemonColorOrdering && pokemonList.every(p => p.bgColor !== undefined)){
            pokemonList.sort((p1, p2) => {
                let c1 = new Color(p1.bgColor);
                let c2 = new Color(p2.bgColor);

                return c1.hue() - c2.hue();
            })
        }

        pokemonListItems = pokemonList.map(pokemon =>
            <PokemonListItem pokemon={pokemon} selected={pokemonDetailedUrl === pokemon.url} setSelectedPokemon={setPokemonDetailed} key={pokemon.id}></PokemonListItem>)

    }

    return (
        <div className="pokemon-list" onMouseDown={e => state.mouseGrabScroll.mouseDownHandler(e)}>
            <div className="pokemon-list-content">
                {pokemonListItems}
            </div>
        </div>
    )
}

// :D
console.log('     .-.            .-.\n' +
    '    /   \\          /   \\\n' +
    '   |   _ \\        / _   |\n' +
    '   ;  | \\ \\      / / |  ;\n' +
    '    \\  \\ \\ \\_.._/ / /  /\n' +
    '     \'. \'.;\'    \';,\' .\'\n' +
    '       \'./ _    _ \\.\'\n' +
    '       .\'  a __ a  \'.\n' +
    '  \'--./ _,   \\/   ,_ \\.--\'\n' +
    ' ----|   \\   /\\   /   |----\n' +
    '  .--\'\\   \'-\'  \'-\'    /\'--.\n' +
    '      _>.__  -- _.-  `;\n' +
    '    .\' _     __/     _/\n' +
    '   /    \'.,:".-\\    /:,\n' +
    '   |      \\.\'   `""`\'.\\\\\n' +
    '    \'-,.__/  _   .-.  ;|_\n' +
    '    /` `|| _/ `\\/_  \\_|| `\\\n' +
    '   |    || type \'hue\' ||   |\n' +
    '    \\   ||__/__|___|__||  /\n' +
    '     \\_ |_ Easter Egg _| /\n' +
    '    .\'  \\ =  _= _ = _= /`\\\n' +
    '   /     `-;----=--;--\'   \\\n' +
    '   \\    _.-\'        \'.    /\n' +
    '    `""`              `""`')

// OMG THIS IS A BRILLIANT IDEA
Object.defineProperty(window, 'hue', {
    get: function() {
        console.log("But not in the console, type it just somewhere in the pokemon window!");
    }
});