import './about-us.css'
import dragon from './dragon.png'
import eevee from './eevee.png'
import snorlax from './snorlax.png'

export function AboutUs(){
    return (
        <div className={'about-us'}>
            <div className="about-us-text-content">
                <h1>About us</h1>
                <div>
                    This website uses <a href={'https://pokeapi.co/'}>PokeApi</a> for retrieving data of the pokemon.
                </div>
                <div>
                    Feel free to check out the project files <a href={'https://github.com/EnBi81/SEP4ExercisesAndHandins/tree/main/WEB2/08%20Assignment%202/pokedex'}>here</a>, or
                    the <a href={'https://github.com/EnBi81/SEP4ExercisesAndHandins/tree/main/WEB2/08%20Assignment%202'}>assignment description</a>.
                </div>
            </div>
            <div className={'about-us-images'}>
                <img src={dragon} alt={'Dragon pokemon'}/>
                <img src={eevee} alt={'Eevee pokemon'}/>
                <img src={snorlax} alt={'Snorlax pokemon'}/>
            </div>
        </div>
    );
}