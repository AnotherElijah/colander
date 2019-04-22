const AppStore = {
    loggedIn: false,
    tokenTimeoutError: false,
    user: {
        name: '',
        id: '',
        tkn: ''
    },
    currentSection: '',
    currentAction: {
        loading: false,
        type:'',
        period: 'short_term',
        playingDemo: false,
        playlistUploaded: false
    },
    topArtists: [],
    topSongs: [],
    topSongsDublicate: [],
    topSongsNoRepeats: [],
    recommendedTracks: [],
    recommendedPlaylistNum: 0,
    exceptFromRecommends: []
};

export {AppStore};