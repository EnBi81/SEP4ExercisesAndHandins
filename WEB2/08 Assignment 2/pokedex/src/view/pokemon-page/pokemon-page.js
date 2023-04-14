import './pokemon-page.css'
import React, {useEffect, useState} from 'react'
import PokemonList from './pokemon_list/PokemonList'
import PokemonDetails from "./pokemon_details/PokemonDetails";
import {getPokemonList} from '../../model/pokemon-list-model';
import {PokemonPageBackground} from "./PokemonPageBackground/PokemonPageBackground";


export function PokemonPage(){

    const [pokemonList, setPokemonList] = useState(undefined);
    const [pokemonDetailed, setPokemonDetailedState] = useState(undefined);

    useEffect(() => {
        getPokemonList()
            .then(pokemons => setPokemonList(pokemons))
    }, [])

    function setPokemonDetailed(pokemon){
        if(pokemonDetailed !== undefined && pokemonDetailed.url === pokemon?.url)
            setPokemonDetailedState(undefined);
        else
            setPokemonDetailedState(pokemon);
    }

    return (
        <div className={'pokemon'}>
            <PokemonPageBackground></PokemonPageBackground>
            <PokemonList pokemonList={pokemonList} pokemonDetailedUrl={pokemonDetailed?.url} setPokemonDetailed={setPokemonDetailed}></PokemonList>
            <PokemonDetails pokemonToShow={pokemonDetailed} setPokemonToShow={setPokemonDetailed}></PokemonDetails>

            {/*<div className="page-navigation">
                <div className="previous"><button>Previous</button></div>
                <div className="next"><button>Next</button></div>
            </div>*/}
        </div>
    )
}



