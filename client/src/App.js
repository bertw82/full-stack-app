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

class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    }
    this.api = this.api.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  componentDidMount() {
    this.getCourses();
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

  async getCourses() {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json().then(data => {
        this.setState({
          courses: data
        })
      });
    } else if (response.status === 401) {
      console.log('Error 401');
    } else {
      throw new Error();
    }
  }

  // async updateCourse() {
  //   const response = await this.api('/course')
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/courses" />} />
            <Route exact path="/courses" render={ () => <Courses courses={this.state.courses} />} />
            <Route path="/courses/create" render={ () => <CreateCourse api={this.api} />} />
            <Route exact path="/courses/:id" render={ () => <CourseDetail api={this.api} /> } />
            <Route path="/courses/:id/update" render={ () => <UpdateCourse api={this.api} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
