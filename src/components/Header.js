import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button
    , Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '780450049786-cngeftle1se52ps8kjk4n3cm49igb1sp.apps.googleusercontent.com';
const STATE_KEY = "TOKEN";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isLogined: localStorage.getItem(STATE_KEY) ? true : false,
            accessToken: localStorage.getItem(STATE_KEY) ? localStorage.getItem(STATE_KEY) : null
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    login(response) {
        console.log(Object.keys(response));
        console.log(response['mc']['access_token']);
        if (response['mc']['access_token']) {
            this.setState(state => ({
                isLogined: true,
                accessToken: response['mc']['access_token']
            }));
        }
        localStorage.setItem(STATE_KEY, response['mc']['access_token']);
    }

    logout(response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
        localStorage.removeItem(STATE_KEY);
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }

    render() {
        const Topbar = () => {
            return (
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span>Add User</NavLink>
                    </NavItem>
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                        prompt="Do you wanna logout?"
                    >
                    </GoogleLogout>
                </Nav>
            );
        }
        const Topbar2 = () => {
            return (
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                    </NavItem>
                           <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText='Login'
                            onSuccess={this.login}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                        />
                </Nav>
            );
        }
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='logo192.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        {this.state.isLogined?<Topbar/>:<Topbar2></Topbar2>}
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron >
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Dummy Website</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}
export default Header;
