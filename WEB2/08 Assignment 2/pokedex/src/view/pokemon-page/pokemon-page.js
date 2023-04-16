import './pokemon-page.css'
import React, {useEffect, useState} from 'react'
import PokemonList from './pokemon_list/PokemonList'
import PokemonDetails from "./pokemon_details/PokemonDetails";
import {getPokemonList} from '../../model/pokemon-list-model';
import {PokemonPageBackground} from "./PokemonPageBackground/PokemonPageBackground";


export function PokemonPage(){

    const [pokemonPage, setPokemonPage] = useState({
        pageNum: 1,
        numberOfPokemonPerPage: 50,
        canGoToPreviousPage: false,
        canGoToNextPage: true,
        pokemonList: [],
    })
    const [pokemonDetailed, setPokemonDetailedState] = useState(undefined);

    // fetch the list of pokemon
    useEffect(() => {
        getPokemonList(pokemonPage.pageNum, pokemonPage.numberOfPokemonPerPage)
            .then(pokemonResponse => {
                setPokemonPage({
                    ...pokemonPage,
                    canGoToPreviousPage: pokemonResponse.previous != null,
                    canGoToNextPage: pokemonResponse.next != null,
                    pokemonList: pokemonResponse.results
                })
            })
    }, [pokemonPage.pageNum])

    function setPokemonDetailed(pokemon){
        if(pokemonDetailed !== undefined && pokemonDetailed.url === pokemon?.url)
            setPokemonDetailedState(undefined);
        else
            setPokemonDetailedState(pokemon);
    }

    let pageNavigation = {
        canGoToPreviousPage: pokemonPage.canGoToPreviousPage,
        canGoToNextPage: pokemonPage.canGoToNextPage,

        goToPreviousPage: () => {
            if(!pokemonPage.canGoToPreviousPage)
                return;

            setPokemonPage({
                ...pokemonPage,
                pageNum: pokemonPage.pageNum - 1,
            })
        },
        goToNextPage: () => {
            if(!pokemonPage.canGoToNextPage)
                return;

            setPokemonPage({
                ...pokemonPage,
                pageNum: pokemonPage.pageNum + 1,
            })
        },
    }

    return (
        <div className={'pokemon'}>
            <PokemonPageBackground></PokemonPageBackground>
            <PokemonList pokemonList={pokemonPage.pokemonList} selectedPokemonUrl={pokemonDetailed?.url} setPokemonDetailed={setPokemonDetailed}></PokemonList>
            <PokemonDetails pokemonToShow={pokemonDetailed} setPokemonToShow={setPokemonDetailed} pageNavigation={pageNavigation}></PokemonDetails>

            {/*<div className="page-navigation">
                <div className="previous"><button>Previous</button></div>
                <div className="next"><button>Next</button></div>
            </div>*/}
        </div>
    )
}



