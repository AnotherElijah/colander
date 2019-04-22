import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, {Component} from 'react';
import './App.css';
import './reset.css';
import Spotify from 'spotify-web-api-js';
import {Display} from './display/display';
import {Menu} from './menu/menu';
import {AppStore} from "./appStore"
import {Hello} from "./display/Hello/Hello";

class App extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            appState: params.access_token ? 'loggedIn' : 'notLogged'
        };
        this.setState = this.setState.bind(this);
        AppStore.loggedIn = params.access_token ? true : false;
        AppStore.user.tkn = params.access_token;
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    changeState(action='loggedIn') {
        this.setState({appState: action});
    }

    componentDidMount() {
        if (this.state.appState === 'loggedIn') AppStore.currentSection = 'playlist';
    }

    render() {
        return (
            this.state.appState === 'loggedIn' ?
                AppStore.tokenTimeoutError?
                    (<div className="request-new-token">
                        <h3>Your session is over.<br/>Pleace reconnect to your spotify account again.</h3>
                    </div>)
                :<Container className="main-wrapper">
                    <Row>
                        <Menu parentState={action => this.changeState(action)}/>
                        <Display token={AppStore.user.tkn} parentState={action => this.changeState(action)}/>
                    </Row>
                </Container>
                :<>
                <div className="main-background-img" />
                <Container className="main-wrapper hello-container">
                    <Row className="hello-filter">
                        <Hello/>
                    </Row>
                </Container>
                </>

        );
    }
}

export default App;