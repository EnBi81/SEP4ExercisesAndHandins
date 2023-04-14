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
    ];

    const headerEasterEgg = {
        text: 'Tic Tac Toe',
        link: '/tictactoe'
    }

    let headerKey = 0;
    const headerTiles = headerDest.map(dest =>
        <HeaderTile text={dest.text} link={dest.link} key={headerKey++}></HeaderTile>)

    return (
        <div className={'header'}>
            <div className={'header-content'}>
                <div className="header-left">
                    {headerTiles}
                </div>
                <div className="header-right">
                    <HeaderTile text={headerEasterEgg.text} link={headerEasterEgg.link}></HeaderTile>
                </div>
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