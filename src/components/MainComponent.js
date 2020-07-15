import React, { Component } from 'react';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import AddUserDetail from './AddUser';

function Main(props) {
    return (
        <>
            <Header />
            <Switch>
                <Route path='/home' component={Home} />
                <Route exact path='/contactus' component={Home} />
                <Route exact path='/aboutus' component={AddUserDetail} />
                <Route exact path='/menu' component={Home} />
                <Redirect to="/home" />
            </Switch>
        </>
    );
}
export default Main;