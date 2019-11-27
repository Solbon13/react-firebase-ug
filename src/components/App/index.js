import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navigation from '../Navigation';
import NewsPage from '../News';
import SignUpPage from '../Account/SignUp';
import SignInPage from '../Account/SignIn';
import PasswordForgetPage from '../Account/PasswordForget';
//import FamilyTreePage from '../Test';
import FamilyTreePage from '../FamilyTree';
import DialogsPage from '../Dialogs';
import AccountPage from '../Account';
import UsersPage from '../Users';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Account/Session';
import Header from '../Header/Header';
import './App.css';

const App = () => (
    <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navigation/>
            <div className='app-wrapper-content'>
                <Route exact path={ROUTES.DIALOGS} component={DialogsPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                <Route path={ROUTES.NEWS} component={NewsPage}/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.USERS} component={UsersPage}/>
                <Route path={ROUTES.GENEALOGY} component={FamilyTreePage}/>
                <hr/>
            </div>
        </div>
    </BrowserRouter>
);
export default withAuthentication(App);