import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <nav className={s.nav}>
    <div className={s.item}>
      <NavLink to={ROUTES.ACCOUNT} activeClassName={s.activeLink}>Профиль</NavLink>
      {/*данные пользователя*/}
    </div>
    <div className={`${s.item} ${s.activeLink}`}>
      <NavLink to={ROUTES.DIALOGS} activeClassName={s.activeLink}>Сообщения</NavLink>
      {/*сообщения пользователя*/}
    </div>
    <div className={s.item}>
      <NavLink to={ROUTES.NEWS} activeClassName={s.activeLink}>Новости</NavLink>
      {/*отображаются новости (новые персоны которые заводит пользователь на которые он подписан, новые персоны с одинаковыми персональными данными)*/}
    </div>
    <div className={s.item}>
      <NavLink to={ROUTES.ADMIN} activeClassName={s.activeLink}>Пользователи</NavLink>
      {/*все зарегистрированные пользователи*/}
    </div>
    <div className={s.item}>
      <SignOutButton />
    </div>
  </nav>
);
const NavigationNonAuth = () => (
  <nav className={s.nav}>
    <div className={s.item}>
      <NavLink to={ROUTES.SIGN_IN} activeClassName={s.activeLink}>Вход</NavLink>
      {/*данные пользователя*/}
    </div>
    <div className={s.item}>
      <NavLink to={ROUTES.NEWS} activeClassName={s.activeLink}>Новости</NavLink>
      {/*отображаются новости (новые персоны которые заводит пользователь на которые он подписан, новые персоны с одинаковыми персональными данными)*/}
    </div>
  </nav>
);
export default Navigation;