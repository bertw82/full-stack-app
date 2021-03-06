import React, { Component } from 'react';
import Form from './Form';
import { withRouter, Link } from 'react-router-dom';

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: [],
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  change(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit() {
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    }

    this.props.createUser(user)
      .then(response => {
        if (response.status === 500) {
          this.props.history.push('/error');
        } else if (response.errors) {
          this.setState({ errors: response.errors });          
        } else {
          this.props.signIn(emailAddress, password);
          console.log('signed in!');
          this.props.history.push('/courses');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
            <label htmlFor="firstName">First Name</label>
              <input 
                id="firstName" 
                name="firstName" 
                type="text" 
                value={firstName}
                onChange={this.change} 
                autoComplete="off"
                />
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                value={lastName}
                onChange={this.change} 
                autoComplete="off"
                />
              <label htmlFor="emailAddress">Email Address</label>
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="email" 
                value={emailAddress} 
                onChange={this.change}
                autoComplete="off"
                />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password}
                onChange={this.change}
                autoComplete="off"
                />
            </React.Fragment>
          )} />
          <p>Already have a user account? Click here to <Link to="/signin" className="sign--a">sign in</Link>!</p>
      </div>
    );
  } 
}

export default withRouter(UserSignUp);
