import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = (props) => {

    const items = props.items.map(item => {
        return <li className='header__item' key={item.id} >
                    <NavLink to={item.path} className='header__link'>{item.name}</NavLink>
                </li>
    });

    return (
        <header className='header'>
            <div className='header__set'>
                <div className='header__brand'> Site Manager </div>
                <ul className='header__menu'>
                    {items}
                </ul>
            </div>
            <div className='header__set'>
                <ul className='header__menu'>
                    <li className='header__item' >
                        {/* <NavLiank to='/logout' className='header__link'>Logout</NavLink> */}
                        <button className='button' onClick={props.onLogout} > Logout </button>
                    </li>
                </ul>
            </div>
        </header>
    )

}

export default Header;