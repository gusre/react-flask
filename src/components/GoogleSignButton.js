import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Header from './Header';


const CLIENT_ID = '780450049786-cngeftle1se52ps8kjk4n3cm49igb1sp.apps.googleusercontent.com';
const STATE_KEY = "TOKEN";

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: localStorage.getItem(STATE_KEY)?true:false,
      accessToken: localStorage.getItem(STATE_KEY)?localStorage.getItem(STATE_KEY):null
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    console.log(Object.keys(response));
    console.log(response['accessToken']);
    if(response['accessToken']){
      this.setState(state => ({
        isLogined: true,
        accessToken: response['accessToken']
      }));
    }
    localStorage.setItem(STATE_KEY,response['accessToken']);
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    localStorage.removeItem(STATE_KEY);
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>
        :      
         <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null }

    </div>
    )
  }
}

export default GoogleBtn;
