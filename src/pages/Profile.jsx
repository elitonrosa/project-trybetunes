import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getTheUser();
  }

  getTheUser = () => {
    this.setState({ isLoading: true }, async () => {
      const { name, email, image, description } = await getUser();
      this.setState({
        name,
        email,
        image,
        description,
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )
        }
      </div>
    );
  }
}
