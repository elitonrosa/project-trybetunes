import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  getFavoriteSongs,
  readFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.updateSongs();
  }

  updateSongs = () => {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs,
      });
    });
  };

  isChecked = (songId) => {
    const favoriteMusics = readFavoriteSongs();
    return favoriteMusics.some(({ trackId }) => songId === trackId);
  };

  favoriteSong = (e, music) => {
    this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      this.updateSongs();
    });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading /> : (
            favoriteSongs.map((music) => (<MusicCard
              key={ music.trackId }
              { ...music }
              musicObj={ music }
              favoriteSong={ this.favoriteSong }
              isChecked={ this.isChecked }
            />))
          )
        }
      </div>
    );
  }
}
