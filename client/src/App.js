import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import DeleteCourse from './components/DeleteCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

class App extends Component {
  constructor() {
    super();
    this.userCookie = Cookies.get('authenticatedUser');
    this.passwordCookie = Cookies.get('password')
    this.state = {
      authenticatedUser: this.userCookie ? JSON.parse(this.userCookie) : null,
      password: this.passwordCookie ? JSON.parse(this.passwordCookie) : ''
    }
    this.api = this.api.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getCourses = this.getCourses.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  // API call function
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

  // Get all courses
  async getCourses() {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Get a specific course
  async getCourse(courseId) {
    const response = await this.api('/courses/' + courseId);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // update a specific course
  async updateCourse(path, data, emailAddress, password) {
    const response = await this.api(`/courses/${path}`, 'PUT', data, true, { emailAddress, password});
    console.log(response);
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // create a new course
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    } else {
      return response.json().then(data => {
        return data.errors;
      });
    }
  }

  // delete a course
  async deleteCourse(path, emailAddress, password) {
    const response = await this.api(`/courses/${path}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return response;
    } else {
      throw new Error();
    }
  }

  // get a user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // create a user
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

  // sign in a user
  async signIn(emailAddress, password) {
    const user = await this.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          password
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('password', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }

  // sign out a user
  signOut() {
    this.setState({ 
      authenticatedUser: null,
      password: '', 
    });
    Cookies.remove('authenticatedUser');
  }

  render() {
    console.log(this.state.authenticatedUser);
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
              render={ () => 
                <Courses 
                  api={this.api} 
                  getCourses={this.getCourses}
                />} />
            <PrivateRoute 
              path="/courses/create" 
              authenticatedUser={this.state.authenticatedUser} 
              password={this.state.password}
              api={this.api}
              createCourse={this.createCourse}
              component={CreateCourse} />
            <Route 
              exact path="/courses/:id" 
              render={ () => 
                <CourseDetail 
                  api={this.api}
                  authenticatedUser={this.state.authenticatedUser}
                  getCourse={this.getCourse}
                /> } />
            <PrivateRoute 
              path="/courses/:id/update" 
              authenticatedUser={this.state.authenticatedUser}
              password={this.state.password}
              api={this.api}
              update={this.updateCourse}
              getCourse={this.getCourse}
              component={UpdateCourse} />
            <PrivateRoute 
              path="/courses/:id/delete"
              authenticatedUser={this.state.authenticatedUser}
              password={this.state.password}
              api={this.api}
              getCourse={this.getCourse}
              deleteCourse={this.deleteCourse}
              component={DeleteCourse}
            />
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
              render={() => 
                <UserSignOut 
                  signOut={this.signOut} 
                /> } />
            <Route 
              path="/error" 
              render={() => <UnhandledError />} />
            <Route 
              path="/notfound"
              render={() => <NotFound />}
            />
            <Route 
              path="/forbidden"
              render={() => <Forbidden />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
