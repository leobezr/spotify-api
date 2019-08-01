import React from 'react';
import Main from './Components/Main';

import Spotify from 'spotify-web-api-js';
const spotify = new Spotify()

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Não verificado',
        image: ''
      },
      step: 1
    }

    if (this.state.loggedIn) {
      spotify.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying = () => {
    spotify.getMyCurrentPlaybackState()
      .then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
    console.log( 'fire' )
  }

  render() {
    const { loggedIn } = this.state
    const { nowPlaying } = this.state

    return (
      <div className="App">
        <Main
          loggedIn={loggedIn}
          nowPlaying={nowPlaying}
          getNowPlaying={this.getNowPlaying}
        />
      </div>
    )
  }
}

export default App;