import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react';
import './optionBtns.css';
import {AppStore} from "../../../appStore";

function OptionBtns(props) {

    function renderFavArtists() {
        /*
        * Filters, doubled artists from topSongs for: "Don`t recommend artists similar to:"
        * */
        let arrOfIds = AppStore.topSongsDublicate.map(item => item.artists[0].id);
        let arrOfIndexes = AppStore.topSongsDublicate.map((item, i) => {
            return arrOfIds.indexOf(item.artists[0].id);
        });
        let sortedIndexes = arrOfIndexes.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);

        AppStore.topSongsNoRepeats = sortedIndexes.map(index => AppStore.topSongsDublicate[index]);

        return AppStore.topSongsNoRepeats.map((item, i) => {
                return (
                    <Col lg="6">
                        <label key={i} htmlFor={item.artists[0].id}>
                            <input id={item.artists[0].id} type="checkbox"/>
                            <span className="filter-item">{item.artists[0].name}</span>
                        </label>
                    </Col>
                )
            }
        );
    }

    let filterOption = function (event) {

        if (event.target.checked === true) {
            console.log('remove artist');
            /*Takes id of chosen artist and removes item with this ID from topSongs*/
            AppStore.topSongs = AppStore.topSongs.filter(item => {
                return item.artists[0].id !== event.target.id;
            })
        }
        else if (event.target.checked === false) {
            console.log('add artist');
            /*Takes id of chosen artist and adds it top topSongs from dublicate*/
            AppStore.topSongsDublicate.forEach(item => {
                if (item.artists[0].id === event.target.id) AppStore.topSongs.push(item);
                return item.artists[0].id !== event.target.id;
            })
        }
    };
    return (
        <>

        <Dropdown>
            <DropdownButton
                alignRight
                className="d-flex justify-content-end playlist-btn__filter"
                variant="success"
                id="dropdown-basic"
                title="Filter">
                <Col lg="12" className="playlist-btn__filter__upper-txt">
                    Don`t recommend artists similar to:<br/>
                </Col>
                <Container as="div" className="options" onClick={(event)=>filterOption(event)}>
                            <Row className="justify-content-lg-around">
                                {renderFavArtists()}
                            </Row>
                </Container>
            </DropdownButton>
        </Dropdown>
        </>

    )
}

export {OptionBtns}