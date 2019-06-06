import React from 'react';
import { Modal, Button } from 'react-materialize'
import API from '../utils/API';

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSignup = () => {
    const { history } = this.props;
    const { username, password } = this.state;
    API.signup({ username, password })
      .then(res => history.push('/login') )
      .catch(err => console.log(err))
  }

  render() {
    const { username, password } = this.state;
    const trigger = <Button>Sign Up</Button>;
    

    return (

      <Modal trigger={trigger}>
      
        
        <h1>Sign Up</h1>
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
        
        <Button onClick={this.handleSignup}>Sign Up</Button>

        
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      
        </Modal>
      

      
    );
  }
}

export default Signup;