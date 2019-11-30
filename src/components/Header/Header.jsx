import React from 'react';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>

        <img src={'http://www.knigarodoslovnaya.ru/userfiles/shop/large/843_rodoslovnaya-kniga.jpg'} alt =""/>

        <div className={s.logoName}>
            Родословная
        </div>
    </header>
}

export default Header;