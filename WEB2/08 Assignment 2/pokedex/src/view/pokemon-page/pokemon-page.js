import './pokemon-page.css'
import React, {useEffect, useState} from 'react'
import PokemonList from './pokemon_list/PokemonList'
import PokemonDetails from "./pokemon_details/PokemonDetails";
import {getEmptyResponse, getPokemonList} from '../../model/pokemon-list-model';
import {PokemonPageBackground} from "./PokemonPageBackground/PokemonPageBackground";


export function PokemonPage(){

    const [pokemonPage, setPokemonPage] = useState({
        pageNum: 1,
        numberOfPokemonPerPage: 50,
        canGoToPreviousPage: false,
        canGoToNextPage: true,
        loading: true,
        pokemonList: [],
        pokemonResponse: getEmptyResponse(),
    })
    const [pokemonDetailed, setPokemonDetailedState] = useState(undefined);

    // fetch the list of pokemon
    useEffect(() => {
        getPokemonList(pokemonPage.pageNum, pokemonPage.numberOfPokemonPerPage)
            .then(pokemonResponse => {
                setTimeout(() => {
                    setPokemonPage({
                        ...pokemonPage,
                        canGoToPreviousPage: pokemonResponse.previous != null,
                        canGoToNextPage: pokemonResponse.next != null,
                        loading: false,
                        pokemonResponse: pokemonResponse,
                        pokemonList: pokemonResponse.results
                    })
                }, 500); // wait for the animation to end
            })
    }, [pokemonPage.pageNum, pokemonPage.numberOfPokemonPerPage])

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
            if(!pokemonPage.canGoToPreviousPage  || pokemonPage.loading)
                return;

            setPokemonPage({
                ...pokemonPage,
                pageNum: pokemonPage.pageNum - 1,
                loading: true,
            })
        },
        goToNextPage: () => {
            if(!pokemonPage.canGoToNextPage || pokemonPage.loading)
                return;

            setPokemonPage({
                ...pokemonPage,
                pageNum: pokemonPage.pageNum + 1,
                loading: true,
            })
        },
        setPageNumber: number => {
            setPokemonPage({
                ...pokemonPage,
                pageNum: number
            })
        },
        setItemsPerPage: number => {
            setPokemonPage({
                ...pokemonPage,
                numberOfPokemonPerPage: number
            })
        }
    }

    return (
        <div className={'pokemon'}>
            <PokemonPageBackground></PokemonPageBackground>
            <PokemonList pokemonPage={pokemonPage} selectedPokemonUrl={pokemonDetailed?.url} setPokemonDetailed={setPokemonDetailed}></PokemonList>
            <PokemonDetails pokemonToShow={pokemonDetailed} isPokemonPageLoading={pokemonPage.loading} setPokemonToShow={setPokemonDetailed} pageNavigation={pageNavigation} apiDataResponse={pokemonPage.pokemonResponse}></PokemonDetails>

            {/*<div className="page-navigation">
                <div className="previous"><button>Previous</button></div>
                <div className="next"><button>Next</button></div>
            </div>*/}
        </div>
    )
}



