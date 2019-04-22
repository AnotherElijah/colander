import React from 'react';
import Button from 'react-bootstrap/Button';
import {AppStore} from "../../../appStore";
import "./addBtn.css";
function AddBtn (props){
    /*
    * Button changing according to bool currentAction.playingDemo
    * */

    return <Button variant=""
                   size="sm"
                   onClick={!AppStore.currentAction.playlistUploaded?props.onClick:null}
                   id="add"
                   className={!AppStore.currentAction.playlistUploaded?"add-btn":"add-btn success-btn"}>
        {!AppStore.currentAction.playlistUploaded&&
        <img className="add-btn__icon" src={require("../../../imgs/Spotify_Icon_RGB_White.png")} width="20px"/>}
        {!AppStore.currentAction.playlistUploaded?<>Upload</>:<>&#x2714; SUCCESS</>}
    </Button>
}

export {AddBtn};