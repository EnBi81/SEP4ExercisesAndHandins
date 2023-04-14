import './header.css'
import {Link} from "react-router-dom";
import {useRef} from "react";

export function Header(){

    let headerRef = useRef();
    let onclick = () => {

        if(headerRef.current.classList.contains('pikachu-protocol'))
            headerRef.current.classList.remove('pikachu-protocol');
        else
            headerRef.current.classList.add('pikachu-protocol');
    }

    return (
        <div className={'header'}>
            <div className={'header-content'} ref={headerRef} onClick={onclick}>
                <div className="header-left">
                    <HeaderTile element={'Home'} linkTo={'/'} extraClassName={'header-pikachu'}></HeaderTile>
                    <HeaderTile element={'About us'} linkTo={'/about'}></HeaderTile>
                </div>
                <div className="header-right">
                    <HeaderTile element={'Tic Tac Toe'} linkTo={'/tictactoe'} extraClassName={'header-tic-tac-toe'}></HeaderTile>
                </div>
            </div>
        </div>
    )
}
function HeaderTile({element, linkTo, extraClassName}){
    return (
        <div className={'header-tile ' + extraClassName}>
            <Link to={linkTo} className={'header-tile-link'}>
                <div className={'header-tile-inner'}>
                    {element}
                </div>
            </Link>
        </div>
    );
}