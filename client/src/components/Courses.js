import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Courses extends Component {

  render() {
    const courses = this.props.courses;
    const list = courses.map(course => {
      return <li key={course.id} className="course-link"><Link to={`/courses/${course.id}`}>{course.title}</Link></li>
    });

    return (
      <>
        <ul>
          { list }
        </ul>
        <button className="button" style={{ margin: "20px"}}><Link className="button-link" to="/courses/create">Create Course</Link></button>
      </>
    );
  }
}

export default withRouter(Courses);