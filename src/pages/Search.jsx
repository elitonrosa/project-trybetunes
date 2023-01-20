import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchInput: '',
    disableButton: true,
    isLoading: false,
    searchedWord: '',
    searchReturn: [],
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

  onClickButton = () => {
    const { searchInput } = this.state;
    this.setState({ isLoading: true }, async () => {
      const result = await searchAlbumsAPI(searchInput);
      this.setState({
        isLoading: false,
        searchInput: '',
        searchReturn: result,
        searchedWord: searchInput,
      });
    });
  };

  render() {
    const {
      disableButton,
      searchInput,
      isLoading,
      searchReturn,
      searchedWord,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <div>
            <input
              type="text"
              name="searchInput"
              value={ searchInput }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disableButton }
              onClick={ this.onClickButton }
            >
              Pesquisar
            </button>
          </div>
          {
            isLoading ? <Loading /> : (
              searchedWord !== ''
              && (
                <div>
                  <p>
                    { searchedWord && `Resultado de álbuns de: ${searchedWord}`}
                  </p>
                  <div>
                    {
                      searchReturn.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
                        searchReturn.map((album, index) => (
                          <AlbumCard key={ index } { ...album } />
                        ))
                      )
                    }
                  </div>
                </div>
              )
            )
          }
        </div>
      </>
    );
  }
}
