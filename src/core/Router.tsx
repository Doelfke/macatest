import React from 'react';
import { Redirect, Route, Router, RouterState, RedirectFunction, browserHistory, IndexRedirect } from 'react-router';

import LoginPage from 'core/Login/LoginPage';
import Redirector from 'core/Redirector';
import DefaultLayout from 'core/Components/DefaultLayout';
import { AuthService } from 'core/Services/AuthService';
import NoNavLayout from 'core/NoNavLayout';
import CreateProfilePage from 'user/create-profile/CreateProfilePage';
import ListApisPage from 'Apis/ApiListPage';
import AddApiPage from 'Apis/AddApiPage';
import EditApiPage from 'Apis/EditApiPage';
import DogsPage from 'Dogs/DogsPage';


const checkAuthentication = (replace: (newPath: string) => void, callback: () => void, nextState: RouterState) => {
    if (nextState.location.pathname === '/login') {
        callback();
        return;
    }
    const token = AuthService.getToken();
    if (!token) {
        replace('/login');
        callback();
        return;
    }
    if (AuthService.isTokenExpired(token)) {
        AuthService.logOut();
        return;
    }
    callback();
};

const onRouteChange = (prevState: RouterState, nextState: RouterState, replace: RedirectFunction, callback?: () => void) => {
    checkAuthentication(replace, callback!, nextState);
};

const onAppLoad = (nextState: RouterState, replace: RedirectFunction, callback?: () => void) => {
    checkAuthentication(replace, callback!, nextState);
};

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" onEnter={onAppLoad} onChange={onRouteChange} >
                <IndexRedirect to="dashboard" />
                <Route component={Redirector}>
                    <Route component={DefaultLayout}>
                        <Route path="apis" component={ListApisPage} />
                        <Route path="api">
                            <Route path="add" component={AddApiPage} />
                            <Route path=":apiId" component={EditApiPage} />
                        </Route>
                        <Route path="dogs" component={DogsPage} />
                    </Route>
                </Route>
            </Route>
            <Route component={NoNavLayout}>
                <Route path="/login" component={LoginPage} />
                <Route path="/user/create-profile" component={CreateProfilePage} />
            </Route>
            <Redirect from="*" to="/dogs" />
        </Router>
    );
};


export default Routes;