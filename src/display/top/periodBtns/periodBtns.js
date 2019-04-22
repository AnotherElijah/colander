import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import './periodBtns.css'
import React, {Component} from 'react';
import {AppStore} from "../../../appStore";

function PeriodBtns(props) {
    return (
        <Nav.Item aria-label="Second group">
            <Row className="ctrl-btns-bottom justify-content-center">
                <Nav.Link
                    className = {AppStore.currentAction.period==='short_term' && "yellow"}
                    onClick={() => props.periodFunc('short_term')}
                    active={AppStore.currentAction.period=="short_term"
                    &&true}>4 weeks</Nav.Link>
                <Nav.Link
                    className = {AppStore.currentAction.period==='medium_term' && "yellow"}
                    onClick={() => props.periodFunc('medium_term')}
                    active={AppStore.currentAction.period=="medium_term"
                    &&true}>6 months</Nav.Link>
                <Nav.Link
                    className = {AppStore.currentAction.period==='long_term' && "yellow"}
                    onClick={() => props.periodFunc('long_term')}
                    active={AppStore.currentAction.period=="long_term"
                    &&true}>all time</Nav.Link>
            </Row>
        </Nav.Item>
    )
}

export {PeriodBtns};
