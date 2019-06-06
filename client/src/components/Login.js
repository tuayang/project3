import React from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext'; 

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    currentUser: null
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleLogin = (onLogin) => {
    const { history } = this.props;
    const { username, password } = this.state;
    API.login({ username, password })
      .then(res => {
        onLogin(res.data);
        history.push('/')
      })
      .catch(err => {
        this.setState({ error: err.response.data.error })
      });
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <UserContext.Consumer>
        {({onLogin}) => (
          <div>
            <h1>Login</h1>
            <label htmlFor="name">Username</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <button onClick={() => this.handleLogin(onLogin)}>Sign up</button>
            <br />
            { error && (
              <div className="alert">
                {error}
              </div>
            )}
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Login;