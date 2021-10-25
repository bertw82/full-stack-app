import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
      courseId: '',
      courseTitle: '',
      courseDescription: '',
      firstName: '',
      lastName: '',
      materialsNeeded: '',
      estimatedTime: '',
    }
    this.getCourse = this.getCourse.bind(this);
    this.renderNull = this.renderNull.bind(this);
  }

  componentDidMount() {
    this.getCourse();
  }

  componentDidUpdate() {
    this.renderNull();
  }

  async getCourse() {
    const courseId = this.props.match.params.id;
    const response = await this.props.api('/courses/' + courseId);
    if (response.status === 200) {
      return response.json().then(data => {
        this.setState({
          course: data,
          courseId: data.id,
          courseTitle: data.title,
          courseDescription: data.description,
          materialsNeeded: data.materialsNeeded,
          estimatedTime: data.estimatedTime,
          firstName: data.user.firstName,
          lastName: data.user.lastName
        })
      });
    }
  }

  renderNull() {
    if (this.state.materialsNeeded === null) {
      this.setState({
        materialsNeeded: '',
      });
    }
    if (this.state.estimatedTime === null ) {
      this.setState({
        estimatedTime: '',
      });
    }
  }

  render() {

    // console.log(this.state);
    return (
     
      <>
      {
        (this.state.course) ?
        <div>
        <div className="actions--bar">
          <ul className="wrap">
            <li className="button"><Link className="button-link" to={{
              pathname: `/courses/${this.state.courseId}/update`,
              state: {
                course: this.state.course,
                courseId: this.state.courseId,
                courseTitle: this.state.courseTitle,
                courseDescription: this.state.courseDescription,
                materialsNeeded: this.state.materialsNeeded,
                estimatedTime: this.state.estimatedTime,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
              }
              }}>Update Course</Link></li>
            <li className="button"><Link className="button-link" to="/courses">Delete Course</Link></li>
            <li className="button button-secondary"><Link to="/courses">Return to List</Link></li>
          </ul>
        </div>
              
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{ this.state.courseTitle }</h4>
                <p>By { this.state.firstName + ' ' + this.state.lastName }</p>
                <ReactMarkdown>{ this.state.courseDescription }</ReactMarkdown>
              </div>

              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <ReactMarkdown>{ this.state.estimatedTime }</ReactMarkdown>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                <ReactMarkdown>{ this.state.materialsNeeded }</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
        </div>
        : <p>I'm sorry...</p>
      }
      </>
     
    );
  }
}

export default withRouter(CourseDetail);