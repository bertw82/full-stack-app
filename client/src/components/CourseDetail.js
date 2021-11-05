import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      userId: '',
      title: '',
      description: '',
      firstName: '',
      lastName: '',
      materialsNeeded: '',
      estimatedTime: '',
      errors: []
    }
    this.AuthUserOptions = this.AuthUserOptions.bind(this);
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.id)
      // .then(errors => {
      //   if (errors.length) {
      //     console.log(errors)
      //   }
      // })
        .then(data => {
          this.setState({
            course: data,
            userId: data.userId,
            courseId: data.id,
            title: data.title,
            description: data.description,
            materialsNeeded: data.materialsNeeded,
            estimatedTime: data.estimatedTime,
            firstName: data.user.firstName,
            lastName: data.user.lastName
          })
        
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/notfound');
      });
  }

  AuthUserOptions() {
    const courseId = this.state.courseId;
    if (this.props.authenticatedUser.id === this.state.userId) {
      return (
        <div className="actions--bar">
          <ul className="wrap">
            <li className="button"><Link to={`/courses/${courseId}/update`}>Update Course</Link></li>
            <li className="button"><Link to={`/courses/${courseId}/delete`}>Delete Course</Link></li>
      
            <li className="button button-secondary"><Link to="/courses">Return to List</Link></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="actions--bar">
          <ul className="wrap">
            <li className="button button-secondary"><Link to="/courses">Return to List</Link></li>
          </ul>
        </div>
      );
    }
  }

  render() {

    const { 
      title,
      description,
      firstName,
      lastName,
      materialsNeeded,
      estimatedTime,
    } = this.state;

    return (
     <div>
      { (this.props.authenticatedUser)
        ? <div>{this.AuthUserOptions()}</div>
  
        : <div className="actions--bar">
            <ul className="wrap">
              <li className="button button-secondary"><Link to="/courses">Return to List</Link></li>
            </ul>
          </div>
      }
              
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{ title }</h4>
                <p>By { firstName + ' ' + lastName }</p>
                <ReactMarkdown>{ description }</ReactMarkdown>
              </div>

              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <ReactMarkdown>{ estimatedTime }</ReactMarkdown>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                <ReactMarkdown>{ materialsNeeded }</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
     </div>
    );
  }
}

export default withRouter(CourseDetail);