import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const album = this.props;
    const { artworkUrl100, collectionName, artistName, collectionId } = album;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${String(collectionId)}` }
        >
          Detalhes do Album
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};
