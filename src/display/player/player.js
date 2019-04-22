import React, {Component} from 'react';
import {AppStore} from "../../appStore";
import "./player.css";

function Back (props){
    function resetStore() {
        AppStore.currentSection = 'playlist';
        AppStore.currentAction.type = 'showTopSongs';
        AppStore.currentAction.playingDemo = false;
        AppStore.recommendedTracks = [];
        AppStore.recommendedPlaylistNum = 0;
        AppStore.exceptFromRecommends = [];
        AppStore.recommendedTracks = [];
        props.parentState();
    }
    return (
        <a onClick={resetStore} className="back-btn">Back</a>
    )
}

class Player extends Component {
    constructor() {
        super();
        this.state = {
            currentlyPlaying: '',
            playlistNum: 0
        };
        this.setState = this.setState.bind(this);
    }

    handleTrackClick(url, id) {
        if (this.refs[id].parentNode.classList.contains('preview-track-empty') === false) {
            AppStore.playingDemo = true;
            this.refs[id].classList.add("yellow");
            this.setState({currentlyPlaying: url});
            this.refs.audio.pause();
            this.refs.audio.load();
            this.refs.audio.play();
        }
    }

    renderTrackList = recommendedTracks => {
        /*compose tracklist*/
        let i = AppStore.recommendedPlaylistNum;
        let counter = 0;
        if (recommendedTracks.length >= 20) {
            return (
                recommendedTracks.map((track, z) => {
                        counter++;
                        return (
                            <li key={"recommendedTrack-" + z}
                                className={track[i].preview_url ? 'preview-track-' + z : 'preview-track-empty'}>
                                <a ref={"track-" + z} id={"track-" + z}
                                   onClick={() => this.handleTrackClick(track[i].preview_url, "track-" + z)}>
                                    {track[i].artists[0].name} - {track[i].name}
                                </a>
                            </li>)
                    }
                ))
        }
    };

    render() {
        return (
            <div className="playlist__player__wrapper">
                <div className="playlist__player">
                    <div className="playlist__player__interface">
                        <audio ref="audio" controls>
                            <source src={this.state.currentlyPlaying} type="audio/ogg"/>
                        </audio>
                    </div>
                    <ul>
                        {this.renderTrackList(AppStore.recommendedTracks)}
                    </ul>
                    <Back parentState = {this.props.parentState}/>
                </div>
            </div>
        )
    }

}

export {Player};