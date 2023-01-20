import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchInput: '',
    disableButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { searchInput } = this.state;
    const two = 2;
    if (searchInput.length >= two) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  render() {
    const { disableButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            name="searchInput"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disableButton }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
