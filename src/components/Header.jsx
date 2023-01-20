import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    isLoading: false,
    username: '',
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const user = await getUser();
      this.setState({
        isLoading: false,
        username: user.name,
      });
    });
  }

  render() {
    const { isLoading, username } = this.state;
    return (
      <div data-testid="header-component">
        {isLoading ? <Loading /> : (
          <>
            <p data-testid="header-user-name">{username}</p>
            <Link to="/search" data-testid="link-to-search">Inicio</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
          </>
        )}
      </div>
    );
  }
}
