import React, { Component } from 'react';
import Header from './components/Header';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticatedUser: null
    }
    this.api = this.api.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    // this.updateCourse = this.updateCourse.bind(this);
    // this.deleteCourse = this.deleteCourse.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async updateCourse(path, data) {
    const response = await this.api(`/courses/${path}`, 'PUT', data);
    console.log(response);
  }

  // async CreateCourse() {

  // }

  // async deleteCourse() {

  // }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error()
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async signIn(emailAddress, password) {
    const user = await this.getUser(emailAddress, password);
    console.log(user);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
  }

  signOut() {
    this.setState({ authenticatedUser: null });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header authenticatedUser={this.state.authenticatedUser} />

          <Switch>
            <Route 
              exact path="/" 
              render={ () => <Redirect to="/courses" />} />
            <Route 
              exact path="/courses" 
              render={ () => <Courses api={this.api} />} />
            <PrivateRoute 
              path="/courses/create" 
              authenticatedUser={this.state.authenticatedUser} 
              api={this.api}
              component={CreateCourse} />
            <Route 
              exact path="/courses/:id" 
              render={ () => <CourseDetail api={this.api} /> } />
            <PrivateRoute 
              path="/courses/:id/update" 
              authenticatedUser={this.state.authenticatedUser}
              api={this.api}
              update={this.updateCourse}
              component={UpdateCourse} />
            <Route 
              path="/signin" 
              render={() => <UserSignIn signIn={this.signIn} /> } />
            <Route 
              path="/signup" 
              render={() => 
                <UserSignUp 
                  createUser={this.createUser} 
                  signIn={this.signIn} />
              } />
            <Route 
              path="/signout" 
              render={() => <UserSignOut signOut={this.signOut} /> } />
            <Route 
              path="/error" 
              render={ () => <h1>Error!</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
