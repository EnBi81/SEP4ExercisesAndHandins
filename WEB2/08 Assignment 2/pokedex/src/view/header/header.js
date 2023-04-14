import './header.css'
import {Link} from "react-router-dom";

export function Header(){

    return (
        <div className={'header'}>
            <div className={'header-content'}>
                <div className="header-left">
                    <HeaderTile element={'Home'} linkTo={'/'}></HeaderTile>
                    <HeaderTile element={'About us'} linkTo={'/about'}></HeaderTile>
                </div>
                <div className="header-right">
                    <HeaderTile element={'Tic Tac Toe'} linkTo={'/tictactoe'}></HeaderTile>
                </div>
            </div>
        </div>
    )
}
function HeaderTile({element, linkTo}){
    return (
        <div className={'header-tile'}>
            <Link to={linkTo}>
                {element}
            </Link>
        </div>
    );
}