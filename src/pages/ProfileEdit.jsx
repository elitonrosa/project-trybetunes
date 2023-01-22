import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    disableButton: true,
  };

  componentDidMount() {
    this.getTheUser();
  }

  validateFields = () => {
    const { name, email, image, description } = this.state;
    if (
      name !== ''
      && email !== ''
      && email.match(/\S+@\S+\.\S+/)
      && image !== ''
      && description !== ''
    ) {
      this.setState({ disableButton: false });
    }
  };

  onClickButton = () => {
    const { name, image, description, email } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      await updateUser(user);
      this.setState({
        isLoading: false,
      });
      history.push('/profile');
    });
  };

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateFields);
  };

  render() {
    const {
      isLoading,
      name,
      email,
      image,
      description,
      disableButton,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading ? <Loading /> : (
            <div>
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    name="name"
                    data-testid="edit-input-name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    type="text"
                    name="email"
                    data-testid="edit-input-email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="image">
                  Foto:
                  <input
                    type="text"
                    name="image"
                    data-testid="edit-input-image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">
                  Descrição:
                  <input
                    type="text"
                    name="description"
                    data-testid="edit-input-description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
              </form>
              <button
                type="button"
                disabled={ disableButton }
                onClick={ this.onClickButton }
                data-testid="edit-button-save"
              >
                Editar perfil
              </button>
            </div>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
