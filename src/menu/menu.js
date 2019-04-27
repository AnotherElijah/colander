import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import {AppStore} from "../appStore";
import "./menu.css";

function Menu(props) {
    const actionChange = (action) => {
        AppStore.currentSection = action;
        props.parentState('loggedIn');
        if(action==='playlist') AppStore.currentAction.type = 'showTopSongs';
    };
    return (
        <Col lg="2" md="2" sm="12" className="menu-wrapper-desktop">
            <a href="http://colander-app.herokuapp.com"><img src={require("../svgs/col-bl-logo.svg")} width={240} className="hello-logo"/></a>
            <Nav className="mr-2 flex-column menu" variant="pills" aria-label="First group" as="ul">
                <Col as="li" className="menu__item-wrapper">
                    <Nav.Item className="menu__item-0">
                        <Nav.Link
                            className="menu__item__link-0"
                            eventKey="2"
                                  href={AppStore.loggedIn === false? "http://localhost:8888/login"||"https://colander11.herokuapp.com/login" : "javascript:function f(e){e.preventDefault();}"}
                                  onClick={AppStore.loggedIn === true ?  () => actionChange('playlist') : null}
                                  active={AppStore.currentSection==='playlist'&&true}
                        >Playlist</Nav.Link>
                    </Nav.Item>
                </Col>
                <Col as="li" className="menu__item-wrapper">
                    <Nav.Item className="menu__item-1">
                        <Nav.Link
                            className="menu__item__link-1"
                            eventKey="1"
                                    href={AppStore.loggedIn === false? "http://localhost:8888/login"||"https://colander11.herokuapp.com/login" : "javascript:function f(e){e.preventDefault();}"}
                                  onClick={AppStore.loggedIn === false ? null : () => actionChange('top')}
                                  active={AppStore.currentSection==='top'&&true}
                        >Top</Nav.Link></Nav.Item>
                </Col>
                <Col as="li" className="menu__item-wrapper">
                    <Nav.Item className="menu__item-2">
                        <Nav.Link
                            className="menu__item__link-2"
                            eventKey="3"
                                  href="javascript:function f(e){e.preventDefault();}"
                                  onClick={() => actionChange('contact')}
                                  active={AppStore.currentSection==='contact'&&true}
                        >Contact</Nav.Link></Nav.Item>
                </Col>
            </Nav>
        </Col>
    )
};

export {Menu};