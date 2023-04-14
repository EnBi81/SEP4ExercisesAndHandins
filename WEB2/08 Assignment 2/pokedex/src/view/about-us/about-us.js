import './about-us.css'
import dragon from './dragon.png'
import eevee from './eevee.png'
import snorlax from './snorlax.png'

export function AboutUs(){
    return (
        <div className={'about-us'}>
            <h1>About us</h1>
            <div>
                This is an about us page of a nice hand-in
            </div>
            <div className={'about-us-images'}>
                <img src={dragon} alt={'Dragon pokemon'}/>
                <img src={eevee} alt={'Eevee pokemon'}/>
                <img src={snorlax} alt={'Snorlax pokemon'}/>
            </div>
        </div>
    );
}