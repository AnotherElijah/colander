import './display.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import {Top} from './top/top';
import {AppStore} from "../appStore";
import {Playlist} from "./playList/playlist";
import {Hello} from "./Hello/Hello";
import {Loading} from "./loading/loading";
import App from "../App";
import '../bootstrap/bootstrap.min.css'

const spotifyWebApi = new Spotify();


class Display extends Component {
    constructor(props) {
        super();
        this.state = {
            tokenTimeout: false
        };
        this.randomiser = this.randomiser.bind(this);
        this.setState = this.setState.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.setStateWrapper = this.setStateWrapper.bind(this);
    }

    showLoading(){
        AppStore.currentAction.loading?AppStore.currentAction.loading=false:AppStore.currentAction.loading=true;
        this.props.parentState('loggedIn');
    }

    topArtists = (timeRange) => {
        AppStore.currentAction.period = timeRange;
        spotifyWebApi.getMyTopArtists({'time_range': AppStore.currentAction.period})
            .then((response) => {
                AppStore.topArtists = response.items;
                AppStore.currentAction.type = 'showTopArtists';
            })
            .then(() => {
                this.props.parentState('loggedIn');
                AppStore.currentSection = 'top';
            })
    };

    topSongs = (timeRange) => {
        AppStore.currentAction.period = timeRange;
        spotifyWebApi.getMyTopTracks({'time_range': AppStore.currentAction.period})
            .then((response) => {
                AppStore.topSongs = response.items;
                AppStore.currentAction.type = 'showTopSongs';
            })
            .then(() => {
                AppStore.topSongsDublicate = [...AppStore.topSongs];
                this.props.parentState('loggedIn');
            })
        /*Dublicate*/
    };

    sliceName(name) {
        let indexOfSpace = name.indexOf(' ');
        let slicedName = name.slice(0, indexOfSpace);
        return slicedName;
    };

    setStateWrapper(stateObj){
        this.setState({stateObj});
    }

    setUserId(setStateWrapper) {
        spotifyWebApi.getMe()
            .then(data => {
                this.sliceName(data.display_name);
                AppStore.user = {
                    id: data.id,
                    name: this.sliceName(data.display_name)
                }
            }, function (err) {
                /*response 401 & AppStore.loggedIn===true means that user access token time is out*/
                if (AppStore.loggedIn) AppStore.tokenTimeoutError = true;
                console.error(err);
                AppStore.tokenTimeoutError = true;
                setStateWrapper({tokenTimeout:true});
            });
    }

    randomiser = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /*Promise*/
    recommendationsArr(counter, callback) {
        /* *
        * fetch 3 recommendations for every track of AppStore.topSongs
        * */
        /*ADD CHECKERS!*/
        let id = 0;
        return new Promise((resolve) => {
            callback();
            this.props.parentState('loggedIn');

            function getRecommendation(counter = 0) {
                if (AppStore.topSongs[id] === undefined) {
                    id = 0;
                    //id = randomiser(0, id - 1);
                }
                spotifyWebApi.getRecommendations({'seed_tracks': AppStore.topSongs[id].id, 'limit': 12})
                    .then(data => {
                        id++;
                        if (data.tracks.length !== 0) {
                            if (AppStore.recommendedTracks[counter] === undefined) {
                                AppStore.recommendedTracks[counter] = [];
                                /*push 'j' tracks on every index ('i') of recommendations*/
                                data.tracks.forEach((trackObj) => {
                                    AppStore.recommendedTracks[counter].push(trackObj);
                                })
                            } else {
                                console.log('AppStore.recommendedTracks[counter] === undefined. ID: ' + id)
                            }
                        } else {
                            console.log('data.tracks.length !== 0')
                        }
                    })
                    .then(() => {
                        /*call until topSongs */
                        if (AppStore.recommendedTracks.length < 20) {
                            getRecommendation(++counter);
                        } else if (AppStore.recommendedTracks.length === 20) {
                            console.log('126')
                            callback(); /*loading off*/
                            resolve();
                        } else {
                            console.log('130')
                            callback(); /*loading off*/
                            resolve();
                        }
                    })
            }

            getRecommendation(counter);
        });
    }

    /*Call Promise recommendationsArr*/
    getRecommendations() {
        /*if AppStore.recommendedTracks is empty, call recommendationsArr()
        *  If AppStore.recommendedTracks already got data, take next arr of recommendations
        *  if Current arr of recommendation is last, fetch new data for AppStore.recommendedTracks
        * */
        if (AppStore.recommendedTracks.length === 0) {
            this.recommendationsArr(0, this.showLoading).then(() => {
                AppStore.recommendedTracks = AppStore.recommendedTracks.filter((item) => {
                    return item[0] !== undefined;
                });
            })
                .then(() => {
                    if (AppStore.recommendedTracks.length < 20) {
                        this.recommendationsArr(AppStore.recommendedTracks.length, this.showLoading)
                            .then(() => {
                                AppStore.currentAction.type = 'showPlayer';
                                this.props.parentState('loggedIn');
                            })
                    } else {
                        AppStore.currentAction.type = 'showPlayer';
                        this.props.parentState('loggedIn');
                    }
                })
        } else if (AppStore.recommendedPlaylistNum !== 11) {
            this.switchPlaylist();
        } else {
            AppStore.recommendedTracks = [];
            AppStore.recommendedPlaylistNum = 0;
            this.recommendationsArr(0, this.showLoading).then(() => {
                AppStore.recommendedTracks = AppStore.recommendedTracks.filter((item) => {
                    return item[0] !== undefined;
                });
            })
                .then(() => {
                    if (AppStore.recommendedTracks.length < 20) {
                        this.recommendationsArr(AppStore.recommendedTracks.length, this.showLoading)
                            .then(() => {
                                AppStore.currentAction.type = 'showPlayer';
                                this.props.parentState('loggedIn');
                            })
                    } else {
                        AppStore.currentAction.type = 'showPlayer';
                        this.props.parentState('loggedIn');
                    }
                })
        }
    }

    switchPlaylist() {
        AppStore.currentAction.playlistUploaded = false;
        this.removeClass('yellow');
        /*Next array of recommendations. <Player> uses recommendedPlaylistNum like an index in arr.map*/
        AppStore.recommendedPlaylistNum++;
        this.props.parentState('loggedIn');
        /***DELETE OLD STYLES***/
    }

    removeClass(cl){
        let elemArr = document.querySelectorAll('.'+cl);
        elemArr.forEach(track=>{
            track.classList.remove(cl);
        });
    }

    addPlaylist(callback) {
        callback();/*loading on*/
        /*create playlist*/
        /*send tracks*/
        let getRecommendedURIs = () => {
            return AppStore.recommendedTracks.map(item => {
                return item[AppStore.recommendedPlaylistNum].uri
            })
        };
        spotifyWebApi.createPlaylist(AppStore.user.id, {name: "Ttttest"})
            .then((data) => {
                spotifyWebApi.addTracksToPlaylist(data.id, getRecommendedURIs())
                .then(()=>{
                    AppStore.currentAction.playlistUploaded = true;
                    callback();
                }) /*loading off*/
            })
    }

    componentDidMount() {
        /*
        * first get user ID, and assigns to state.id
        * */
        spotifyWebApi.setAccessToken(this.props.token);
        /*        .then(()=>{
                })*/
        this.setUserId(this.setStateWrapper);
        this.topSongs('medium_term');
    }

    render() {
        return (
            <>
            {AppStore.currentAction.loading === true && <Loading/>}
            <Col lg="10" md="10" sm="12" className="functional-main-wrapper">
                {AppStore.currentSection === 'top' &&
                <>
                <Top topArtists={this.topArtists}
                     topSongs={this.topSongs}
                     period={AppStore.currentAction.period === 'short_term' ? 'last 4 weeks'
                         : AppStore.currentAction.period === 'long_term' ? 'all time'
                             : 'last 6 months'}
                     periodFunc={AppStore.currentAction.type === 'showTopArtists' ?
                         this.topArtists.bind(this)
                         : this.topSongs.bind(this)}/>
                </>}
                {AppStore.currentSection === 'playlist' && (
                AppStore.currentAction.type === "showPlayer" ?
                    <Playlist parentState = {this.props.parentState} generate={this.getRecommendations.bind(this)} add={()=>this.addPlaylist(this.showLoading)}/>
                    :<>
                    <Playlist parentState = {this.props.parentState} generate={this.getRecommendations.bind(this)} add={()=>this.addPlaylist(this.showLoading)}/>
                    {/*works when:
                    * generate>TOP>playlist
                    */}
                    {AppStore.currentAction.playingDemo===false
                    &&<Top period='last 4 weeks'/>}
                    </>)
                }
            </Col>
            </>
        )
    }

}

export {Display}
