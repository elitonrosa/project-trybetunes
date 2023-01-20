import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loginName: '',
    disableButton: true,
    isLoading: false,
    savedUser: false,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { loginName } = this.state;
    const three = 3;
    if (loginName.length >= three) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  onClickButton = () => {
    const { loginName } = this.state;
    const name = { name: loginName };
    this.setState({ isLoading: true }, async () => {
      await createUser(name);
      this.setState({
        isLoading: false,
        savedUser: true,
      });
    });
  };

  render() {
    const { disableButton, isLoading, savedUser } = this.state;

    return (
      <div data-testid="page-login">
        { savedUser && <Redirect to="/search" /> }
        {
          isLoading ? (
            <Loading />
          ) : (
            <form>
              <input
                type="text"
                name="loginName"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ () => {
                  this.onClickButton();
                } }
                disabled={ disableButton }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}
