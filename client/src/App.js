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

class App extends Component {
  constructor() {
    super();
    this.api = this.api.bind(this);
  }

  api(path, method = 'GET', body = null) {
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

    return fetch(url, options);
  }

  async updateCourse(path, data) {
    const response = await this.api(`/courses/${path}`, 'PUT', data);
    console.log(response);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/courses" />} />
            <Route exact path="/courses" render={ () => <Courses api={this.api} />} />
            <Route path="/courses/create" render={ () => <CreateCourse api={this.api} />} />
            <Route exact path="/courses/:id" render={ () => <CourseDetail api={this.api} /> } />
            <Route path="/courses/:id/update" render={ () => <UpdateCourse api={this.api} update={this.updateCourse} />} />
            <Route path="/signin" render={() => <UserSignIn /> } />
            <Route path="/signup" render={() => <UserSignUp /> } />
            <Route path="/signout" render={() => <UserSignOut /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
