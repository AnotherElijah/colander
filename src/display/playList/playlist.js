import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import React from 'react';
import {OptionBtns} from './optionBtns/optionBtns';
import {AppStore} from "../../appStore";
import {Player} from "../player/player";
import {AddBtn} from "../playList/add/addBtn";
import './playlist.css';

function Playlist(props) {
    if (AppStore.recommendedTracks.length > 0){
        AppStore.currentAction.playingDemo = true;
        AppStore.currentAction.type = 'showPlayer';
    }

    return (
        <Container as="div" className="playlist">
            <Row className="justify-content-around playlist__upper-txt__wrapper">
                <Col lg="10" as="div" className="playlist__upper-txt">
                    {AppStore.recommendedTracks.length===0&&<h3 className="playlist__upper-txt__hello">Hello, {AppStore.user.name}!</h3>}
                    <span className="playlist__upper-txt__instruction">
                        {AppStore.currentAction.type === "showTopSongs"?
                            <h3>Push FILTER to set your searching parameters and click GENERATE to make new random Spotify playlist!</h3>
                            :<h3>Your playlist is ready!</h3>
                        }</span>
                </Col>
            </Row>
            {AppStore.currentAction.type === 'showTopSongs'
            && <Row className="justify-content-center playlist__btn-wrapper">
                <Button onClick={props.generate} className="playlist-btn__generate">
                    Generate
                </Button>
                <OptionBtns/></Row>}
            {AppStore.currentAction.type === "showPlayer"
            &&
            <>
            <div className="playlist__btn-wrapper">
                <Button onClick={props.generate} className="playlist-btn__generate">
                    Generate
                </Button>
                <AddBtn onClick={props.add}/>
            </div>
            <Player parentState = {props.parentState}/>
            </>}

        </Container>
    )
}

export {Playlist};