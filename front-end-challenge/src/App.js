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
      step: 1,
      library: {
        artist: {
          name: '',
          selfy: '',
          group: '',
          boolean: true
        }
      },
      list: {
        name: '',
        pop: '',
        pic: '',
        type: ''
      },
      boolean: false,
      albums: []
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

  getNowPlaying = (e) => {
    const self = e.currentTarget;

    spotify.getMyCurrentPlaybackState()
      .then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })

    self.textContent = 'Loading...';
    this.state.step++
  }

  nextStep = e => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  search = e => {
    const query = e.currentTarget.value
    if (query.length < 4) return

    spotify.searchTracks(query)
      .then(response => {
        this.setState({
          library: {
            artist: {
              name: Object.keys(response.tracks).length && Object.values(response.tracks).length ? response.tracks.items[0].name : 'Não encontrei nada...',
              selfy: Object.keys(response.tracks).length && Object.values(response.tracks).length ? response.tracks.items[0].album.images[0].url : 'url não encontrada...',
              group: Object.keys(response.tracks).length && Object.values(response.tracks).length ? response.tracks.items[0].album.artists[0].name : 'artista não encontrado...',
            }
          },
          boolean: Object.keys(response.tracks).length && Object.values(response.tracks).length ? true : false
        })
      })
  }

  findArtist = e => {
    const query = e.currentTarget.textContent

    spotify.searchArtists(query)
      .then(response => {
        this.setState({
          list: {
            name: response.artists.items[0].name,
            pop: response.artists.items[0].popularity,
            pic: response.artists.items[0].images[0].url,
            type: response.artists.items[0].genres[0]
          }
        })
        setTimeout(() => {
          this.callback.call(response.artists.items[0].name)
        }, 200)
      })
  }

  callback = query => {
    spotify.searchAlbums(query)
    .then(response => {
      const resp = response.albums.items
      this.setState({
        albums: [
          {
            name: resp[0].artists[0].name,
            img: resp[0].images[0].url,
            date: resp[0].release_date,
          },
          {
            name: resp[1].artists[0].name,
            img: resp[1].images[0].url,
            date: resp[1].release_date,
          },
          {
            name: resp[2].artists[0].name,
            img: resp[2].images[0].url,
            date: resp[2].release_date,
          },
          {
            name: resp[3].artists[0].name,
            img: resp[3].images[0].url,
            date: resp[3].release_date,
          },
          {
            name: resp[4].artists[0].name,
            img: resp[4].images[0].url,
            date: resp[4].release_date,
          },
          {
            name: resp[5].artists[0].name,
            img: resp[5].images[0].url,
            date: resp[5].release_date,
          },
          {
            name: resp[6].artists[0].name,
            img: resp[6].images[0].url,
            date: resp[6].release_date,
          },
          {
            name: resp[7].artists[0].name,
            img: resp[7].images[0].url,
            date: resp[7].release_date,
          },
          {
            name: resp[8].artists[0].name,
            img: resp[8].images[0].url,
            date: resp[8].release_date,
          },
          {
            name: resp[9].artists[0].name,
            img: resp[9].images[0].url,
            date: resp[9].release_date,
          },
        ]
      })
    })
  }


  render() {
    const { loggedIn } = this.state
    const { nowPlaying } = this.state
    const { step } = this.state
    const { library } = this.state
    const { list } = this.state
    const { boolean } = this.state
    const { albums } = this.state

    return (
      <div className="App">
        <Main
          loggedIn={loggedIn}
          nowPlaying={nowPlaying}
          step={step}
          library={library}
          boolean={boolean}
          list={list}
          albums={albums}
          getNowPlaying={this.getNowPlaying}
          nextStep={this.nextStep}
          search={this.search}
          findArtist={this.findArtist}
        />
      </div>
    )
  }

  
}

export default App;