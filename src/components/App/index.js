import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { withFirebase } from '../Firebase';
import Header from '../Header/Header';
import './App.css';

const App = () => (
  <Router>
    <div className='app-wrapper'>
      <Header/>
      <Navigation />
      <div className='app-wrapper-content'>
      <hr />
      <Route exact path={ROUTES.DIALOGS} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.NEWS} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </div>
  </Router>
);
export default withAuthentication(App);