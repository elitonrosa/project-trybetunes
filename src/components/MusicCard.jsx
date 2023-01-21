import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { preview, musicName } = this.props;
    return (
      <>
        <p>{musicName}</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  preview: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
};
