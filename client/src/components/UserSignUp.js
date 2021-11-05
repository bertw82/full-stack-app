import React, { Component } from 'react';
import Form from './Form';
import { withRouter } from 'react-router';

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
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.signIn(emailAddress, password);
          console.log('signed in!');
          this.props.history.push('/courses');
        }
      })
      .catch((err) => {
        console.log(err);
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
                />
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                value={lastName}
                onChange={this.change} 
                />
              <label htmlFor="emailAddress">Email Address</label>
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="email" 
                value={emailAddress} 
                onChange={this.change}
                />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password}
                onChange={this.change}
                />
            </React.Fragment>
          )} />
      </div>
    );
  } 
}

export default withRouter(UserSignUp);
