import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      musicObj,
      favoriteSong,
      isChecked,
    } = this.props;

    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favoriteMusic">
          <input
            type="checkbox"
            id="favoriteMusic"
            name="favoriteMusic"
            checked={ isChecked(trackId) }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (e) => {
              favoriteSong(e.target, musicObj);
            } }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteSong: PropTypes.func.isRequired,
  isChecked: PropTypes.func.isRequired,
  musicObj: PropTypes.shape({}).isRequired,
};
