import React from "react";
import './PokemonDetailsBottom.css'
import pokemonTypes from "../../../model/pokemon-types";
import Color from "color";

export function PokemonExtendedInfoContainer({pokemonDetailed}){


    return (
        <div className={'pokemon-details-grid-item pokemon-extended-info-container'}>
            <BaseInfoContainer pokemonDetailed={pokemonDetailed}></BaseInfoContainer>
            <StatisticsContainer pokemonDetailed={pokemonDetailed}></StatisticsContainer>
            <GenerationContainer></GenerationContainer>
        </div>
    )
}

function BaseInfoContainer({pokemonDetailed}){
    let weight = pokemonDetailed.weight / 10;
    let generationCount = getGenerationCount(pokemonDetailed);

    let typesElement = (
        <>
            <div>Types</div>
            <div>
                {pokemonDetailed.types
                    // map to kind of model object
                    .map(type => {
                        let pokemonType = pokemonTypes[type.type.name];

                        return {
                            name: type.type.name,
                            color: new Color(pokemonType.color).darken(0.4).toString(),
                        }
                    })
                    // map to view
                    .map(type => (
                        <span className={'pokemon-type'} key={type.name} style={{'--type-color': type.color}}>
                            {type.name}
                        </span>
                    ))}
            </div>
        </>
    );

    let heightElement = (
        <>
            <div>Height</div>
            <div>{pokemonDetailed.height} dm</div>
        </>
    );
    let weightElement = (
        <>
            <div>Weight</div>
            <div>{pokemonDetailed.weight / 10} kg</div>
        </>
    );
    /*let abilitiesElement = ( // I'll leave this here just in case I will need it later
        <>
            <div>Abilities</div>
            <div>
                {pokemonDetailed.abilities
                    .map(ability => ability.ability.name)
                    .reduce((abilityString, current) => `${abilityString}, ${current}`)}
            </div>
        </>
    );*/
    let generationElement = (
        <>
            <div>Generation</div>
            <div>
                {generationCount}
            </div>
        </>
    );

    return (
        <div className={'pokemon-base-info-container smooth-scrollbar'}>
            <GridItemsWrapper key={1} items={typesElement}></GridItemsWrapper>
            <GridItemsWrapper key={2} items={heightElement}></GridItemsWrapper>
            <GridItemsWrapper key={3} items={weightElement}></GridItemsWrapper>
            <GridItemsWrapper key={4} items={generationElement}></GridItemsWrapper>
        </div>
    )
}

function StatisticsContainer({pokemonDetailed}){
    let statisticsModel = [
        {
            name: 'HP',
            title: 'Health points',
            value: pokemonDetailed.stats[0]['base_stat'],
            maxValue: 255, // Blissey having the highest HP base stat of 255 in the entire series, which, coupled with its special defense, max IVs, and EVs, makes sure that no move other than one hit KOs can take Blissey down.
        },
        {
            name: 'Attack',
            title: 'Attack',
            value: pokemonDetailed.stats[1]['base_stat'],
            maxValue: 190, // Mega Mewtwo X - 190
        },
        {
            name: 'Defense',
            title: 'Defense',
            value: pokemonDetailed.stats[2]['base_stat'],
            maxValue: 230, // Shuckle - 230
        },
        {
            name: 'Sp. Atk',
            title: 'Special Attack',
            value: pokemonDetailed.stats[3]['base_stat'],
            maxValue: 194, // Mega Mewtwo Y – 194
        },
        {
            name: 'Sp. Def',
            title: 'Special Defense',
            value: pokemonDetailed.stats[4]['base_stat'],
            maxValue: 230, // Shuckle - 230
        },
        {
            name: 'Speed',
            title: 'Speed',
            value: pokemonDetailed.stats[5]['base_stat'],
            maxValue: 180, // Deoxys - 180
        },
    ];

    let listItemKey = 0;
    let view = statisticsModel
        .map(stat => <StatisticListItem key={stat.name}
                                        name={stat.name}
                                        title={stat.title}
                                        value={stat.value}
                                        maxValue={stat.maxValue}></StatisticListItem>)
        .map(listItem => <GridItemsWrapper key={listItemKey++} items={listItem}></GridItemsWrapper>);


    return (
        <div className={'statistics-container'}>
            {view}
        </div>
    )
}

function StatisticListItem({name, title, value, maxValue}){
    return (
        <>
            <div title={title}>{name}</div>
            <div>{value}</div>
            <div><progress max={maxValue} value={value}></progress></div>
        </>
    )
}

function GenerationContainer(){
    return (
        <div className={'generation-container'}>

        </div>
    )
}

function GridItemsWrapper({items}){
    return (
        <div className="grid-items-wrapper">
            {items}
        </div>
    )
}

/* Util functions */
function getGenerationCount(pokemonDetailed){
    let generations = [
        'generation-i',
        'generation-ii',
        'generation-iii',
        'generation-iv',
        'generation-v',
        'generation-vi',
        'generation-vii',
        'generation-viii',
    ];

    let versions = pokemonDetailed.sprites.versions;

    for (const generation of generations) {
        let pictures = versions[generation];
        if(checkAllKeysAreNull(pictures))
            continue;

        return generations.indexOf(generation) + 1;
    }

    // last generation
    return 9;
}

function checkAllKeysAreNull(obj){
    for (const key of Object.keys(obj)) {
        let value = obj[key];

        if(value == null)
            continue;

        if(typeof value === 'string' || value instanceof String)
            return false;

        if(Object.keys(value).length > 0 && checkAllKeysAreNull(value))
            continue;

        return false;
    }
    return true;
}