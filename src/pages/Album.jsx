import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
    artist: '',
    albumName: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    this.setState({
      musics,
      artist: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  render() {
    const { artist, musics, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{albumName}</p>
        {
          musics.map((music, index) => {
            if (index === 0) {
              return false;
            }
            return (<MusicCard
              key={ music.trackId }
              preview={ music.previewUrl }
              musicName={ music.trackName }
            />);
          })
        }
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
