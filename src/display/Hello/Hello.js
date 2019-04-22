import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, {Component} from 'react';
import '../../bootstrap/bootstrap.min.css'
import './Hello.css'

function Hello() {
    return (<>
        <Container as="main" className="main-background-wrapper">
            <Col as="main" lg="12" className="introduction-container">
                <Col as="main" lg="12" className="introduction-container-filter">
                    <Row lg="4" as="header" className="justify-content-center introduction">
                        <span className="large-header"><img src={require("../../svgs/col-bl-logo.svg")} width={360}
                                                            className="hello-logo"/></span>
                        <h1 className="introduction-txt">Generate your playlist in 3 clicks!</h1>
                    </Row>
                    <Container as="div" className="introduction__instructions">
                        <h2 className="introduction__instructions__header">
                            All you need to do is
                        </h2>
                        <Row as="ul">
                            <Col as="li" lg="4" className="justify-content-left introduction__instructions__step-0">
                                <h3 className="introduction__instructions__step-0__num">1</h3>
                                <a href={"http://localhost:8888/login"||"https://colander11.herokuapp.com/login"}>
                                    <div><span>Click here to<br/> authorize with</span><br/>
                                        <img src={require('../../imgs/Spotify_Logo_RGB_White.png')} alt="SPOTIFY"
                                             width={120} className="spotify-login"/>
                                    </div>
                                </a>
                            </Col>
                            <Col as="li" lg="4" className="justify-content-left introduction__instructions__step-1">
                                <h3 className="introduction__instructions__step-1__num">2</h3>
                                <div>Generate new playlist</div>
                            </Col>
                            <Col as="li" lg="4" className="justify-content-left introduction__instructions__step-2">
                                <h3 className="introduction__instructions__step-2__num">3</h3>
                                <div>Click ADD, to push new playlist to your Spotify account</div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Col>
        </Container>
        </>
    )
};

export {Hello};