import React, {Component} from 'react';
import Form from './Form';

export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const {
      email,
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
                value={email} 
                onChange={this.change}
                />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password}
                onChange={this.change} />
            </React.Fragment>
          )}
        />
      </div>
    );

  }

}