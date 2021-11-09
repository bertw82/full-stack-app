import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Form from './Form';

class DeleteCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      courseId: '',
      loading: true,
      errors: []
    }
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    // get course to delete
    this.props.getCourse(this.props.match.params.id)
    .then(response => {
      if (response.status === 404) {
        this.props.history.push('/notfound');
      } else if (response.status === 500) {
        this.props.history.push('/error');
      } else if (response.status === 200) {
        return response.json().then(data => {
          this.setState({
            userId: data.userId,
            courseId: data.id,
            loading: false
          })
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push('/error');
        });
      } else {
        throw new Error();
      }
    });
  }

  // delete a course
  async deleteCourse(path, emailAddress, password) {
    const response = await this.props.api(`/courses/${path}`, 'DELETE', null, true, { emailAddress, password });
    return response;
  }

  submit() {
    this.deleteCourse(this.state.courseId, this.props.authenticatedUser.emailAddress, this.props.password)
      .then(response => {
        if (response.status === 204) {
          this.props.history.push('/courses')
        } else if (response.status === 403) {
          this.props.history.push('/forbidden');
        } else if (response.status === 404) {
          this.props.history.push('/forbidden');
        } else if (response.status === 500) {
          this.props.history.push('/error');
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel() {
    this.props.history.push(`/courses/${this.state.courseId}`);
  }

  renderForm() {
    // render delete form if there is an authenticated user, otherwise redirect to "forbidden" component
    return (
      <>
      {
        (this.props.authenticatedUser.id === this.state.userId)
        ? <div className="form--centered">
            <h2>Are you sure you want to delete this course?</h2>
            <Form 
              cancel={this.cancel}
              submit={this.submit}
              errors={this.state.errors}
              submitButtonText="Delete Course"
              elements={() => {}}
            />
          </div>
        : <Redirect to="/forbidden" />
      }
      </>
    );
  }

  render() { 
    return (
      <>
      {
        (this.state.loading)
        ? <h2 className="wrap">Loading...</h2>
        : <div>{this.renderForm()}</div>
      }
      </>
    );
  }
}

export default withRouter(DeleteCourse);