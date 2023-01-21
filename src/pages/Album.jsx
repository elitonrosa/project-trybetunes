import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  getFavoriteSongs,
  readFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    musics: [],
    artist: '',
    albumName: '',
    isLoading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    getFavoriteSongs();
    this.setState({
      musics,
      artist: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  favoriteSong = (e, music) => {
    const { checked } = e;
    if (checked) {
      this.setState({ isLoading: true }, async () => {
        await addSong(music);
        getFavoriteSongs();
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: true }, async () => {
        await removeSong(music);
        this.setState({ isLoading: false });
      });
    }
  };

  isChecked = (songId) => {
    const favoriteMusics = readFavoriteSongs();
    return favoriteMusics.some(({ trackId }) => songId === trackId);
  };

  render() {
    const { artist, musics, albumName, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : (
          <>
            <p data-testid="artist-name">{artist}</p>
            <p data-testid="album-name">{albumName}</p>
            {
              musics
                .filter((music, index) => index > 0)
                .map((music) => (<MusicCard
                  key={ music.trackId }
                  { ...music }
                  musicObj={ music }
                  favoriteSong={ this.favoriteSong }
                  isChecked={ this.isChecked }
                />))
            }
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
