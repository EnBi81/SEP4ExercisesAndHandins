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
                    This website was created for a <b>school assignment</b>, but that ain't stop me making it fancy.
                    It was designed only for desktop users, on mobile the gui is glitched all the way through.
                    If you have any suggestions <i>(pls don't suggest to make it mobile friendly)</i>, feel free to check
                    out the github repo and open an issue :D
                </div>
                <br/>
                <div>
                    This website uses <a href={'https://pokeapi.co/'}>PokeApi</a> for retrieving data of the pokemon.
                </div>
                <br/>
                <div>
                    Feel free to check out the <a href={'https://github.com/EnBi81/SEP4ExercisesAndHandins/tree/main/WEB2/08%20Assignment%202/pokedex'}>project files</a>, or
                    the <a href={'https://github.com/EnBi81/SEP4ExercisesAndHandins/tree/main/WEB2/08%20Assignment%202'}>assignment description</a>.
                </div>
                <br/>
                <div>
                    This project consists of:
                    <ul>
                        <li>2684 lines of Javascript</li>
                        <li>1950 lines of CSS</li>
                    </ul>
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