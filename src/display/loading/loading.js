import Spinner from 'react-bootstrap/Spinner';
import React, {Component} from 'react';
import './loading.css'

function Loading() {
    return (
        <div className="loading">
            <Spinner animation="grow" variant="success"/>
            <Spinner animation="grow" variant="danger"/>
            <Spinner animation="grow" variant="warning"/>
        </div>
    )
}

export {Loading};