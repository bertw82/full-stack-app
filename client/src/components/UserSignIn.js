import React, {Component} from 'react';
import Form from './Form';
import { withRouter } from 'react-router';

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: []
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
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/courses' } };

    this.props.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          console.log(user);
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] }
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error')
      })
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">
        <h2>Sign In</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
              <label htmlFor="emailAddress">Email Address</label>
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="email" 
                value={emailAddress} 
                onChange={this.change}
                autoComplete="on"
                />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password}
                onChange={this.change}
                autoComplete="on" />
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

export default withRouter(UserSignIn);