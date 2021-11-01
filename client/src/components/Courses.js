import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    this.props.getCourses()
      .then(data => {
        this.setState({
          courses: data
        })
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/notfound');
      });
  }

  render() {
    const list = this.state.courses.map(course => {
      return  <div key={course.id} className="course--link course--module">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">
                  <Link className="button-link" to={`/courses/${course.id}`}>{course.title}</Link>
                </h3>
              </div> 
     
        
    });

    return (
      <div className="wrap main--grid">
          { list }
          <div className="course--module course--add--module">
            <Link to="/courses/create">
              <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
              </span>
            </Link>
          </div>
      </div>
    );
  }
}

export default withRouter(Courses);