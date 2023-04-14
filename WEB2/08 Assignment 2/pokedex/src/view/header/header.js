import './header.css'
import {Link} from "react-router-dom";

export function Header(){

    const headerDest = [
        {
            text: 'Home',
            link: '/'
        },
        {
            text: 'About Us',
            link: '/about'
        }
    ]

    let headerKey = 0;
    const headerTiles = headerDest.map(dest =>
        <HeaderTile text={dest.text} link={dest.link} key={headerKey++}></HeaderTile>)

    return (
        <div className={'header'}>
            <div className={'header-content'}>
                {headerTiles}
            </div>
        </div>
    )
}

function HeaderTile({text, link}){
    return (
        <div className={'header-tile'}>
            <Link to={link}><div>{text}</div></Link>
        </div>
    );
}