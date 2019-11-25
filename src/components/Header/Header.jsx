import React from 'react';
import s from './Header.module.css';
import logo from '../../assets/images/logo.jpg'

const Header = (props) => {
    return <header className={s.header}>

        <img src={logo}/>

        <div className={s.logoName}>
            Родословная
        </div>
    </header>
}

export default Header;