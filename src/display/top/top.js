import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import React, {Component} from 'react';
import {AppStore} from "../../appStore";
import {PeriodBtns} from './periodBtns/periodBtns';
import "./top.css";

function ArtistImg(props) {
    return (<Image src={props.i <= 2 ?
        props.item.album.images[0].url :
        props.i <= 8 ?
            props.item.album.images[props.item.album.images.length === 1 ? 0 : 1].url :
            props.item.album.images[props.item.album.images.length - 1].url}
                   width={props.i <= 2 ? "150px"
                       : props.i <= 8 ? "100px"
                           : "60px"}
                   height={props.i <= 2 ? "150px"
                       : props.i <= 8 ? "100px"
                           : "60px"}
                   className={props.i <= 2 ? "top__artist__img-lg"
                       : props.i <= 8 ? "top__artist__img-md"
                           : "top__artist__img-sm"}
                   roundedCircle/>)
}

function AlbumImg(props) {
    return (<Image src={props.i <= 2 ?
        props.item.images[0].url :
        props.i <= 8 ?
            props.item.images[props.item.images.length === 1 ? 0 : 1].url :
            props.item.images[props.item.images.length - 1].url}
                   width={props.i <= 2 ? "150px"
                       : props.i <= 8 ? "100px"
                           : "60px"}
                   height={props.i <= 2 ? "150px"
                       : props.i <= 8 ? "100px"
                           : "60px"}
                   className={props.i <= 2 ? "top__album__img-lg"
                       : props.i <= 8 ? "top__album__img-md"
                           : "top__album__img-sm"}
                   roundedCircle/>)
}

function Top(props) {
    return (
        <Col as="div" className="top-wrapper">
            {AppStore.currentSection === 'top'
            &&
            <>
            <Nav lg="12" variant="tabs" className="ctrl-btns justify-content-center">
                <Nav.Item className="mr-2" aria-label="First group">
                    <Row className="ctrl-btns-top justify-content-center">
                        <Nav.Link onClick={() => props.topArtists('medium_term')}
                                  active={AppStore.currentAction.type == "showTopArtists" && true}>My top artists</Nav.Link>
                        <Nav.Link onClick={() => props.topSongs('medium_term')}
                                  active={AppStore.currentAction.type == "showTopSongs" && true}>My top songs</Nav.Link>
                    </Row>
                </Nav.Item>
            </Nav>
            <Nav lg="12" variant="pills" className="ctrl-btns justify-content-center">
                <PeriodBtns periodFunc={props.periodFunc}/>
            </Nav>
            </>}
            <Row className="justify-content-center">
                <div>Your most listened {AppStore.currentAction.type == "showTopArtists"? <span className="yellow">artists</span>:<span className="yellow">songs</span>} for <span className="yellow">{props.period}</span></div>
            </Row>
            <Row as="ul" className="justify-content-between album-imgs">
                {AppStore.currentAction.type === 'showTopArtists' ?
                    AppStore.topArtists.map(
                        (item, i) => <Col lg={i <= 2 ? "4"
                            : i <= 8 ? "2"
                                : "1"}
                                          md={i <= 2 ? "4"
                                              : i <= 8 ? "2"
                                                  : "2"}
                                          sm={i <= 2 ? "4"
                                              : i <= 8 ? "2"
                                                  : "1"}
                                          as="li" key={i} className={"album-imgs__item album-imgs__item-" + i}>
                            <Row className="justify-content-lg-center album-imgs__item__inner">
                                {/*Looking for last index of images array(== most smaller picture)*/}
                                <AlbumImg i={i} item={item}/>
                                <Row className="justify-content-center album-imgs__txt">
                                    <h4>{item.name}</h4>
                                </Row>
                            </Row></Col>
                    ) :
                    AppStore.topSongs.map(
                        (item, i) => <Col lg={i <= 2 ? "4"
                            : i <= 8 ? "2"
                                : "1"}
                                          md={i <= 2 ? "4"
                                              : i <= 8 ? "2"
                                                  : "2"}
                                          sm={i <= 2 ? "4"
                                              : i <= 8 ? "2"
                                                  : "1"}
                                          as="li" key={i} className={"album-imgs__item album-imgs__item-" + i}>
                            <Row className="justify-content-lg-center album-imgs__item__inner">
                                {/*Looking for last index of images array(== most smaller picture)*/}
                                <ArtistImg i={i} item={item}/>
                                <Row className="justify-content-center album-imgs__txt">
                                    <h4>{item.artists[0].name}</h4>
                                    <span className="top-song">{item.name}</span>
                                </Row>
                            </Row></Col>
                    )}
            </Row>
        </Col>

    )
}

export {Top};