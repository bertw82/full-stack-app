import React, {Component} from 'react';
import { withRouter } from 'react-router';
import Form from './Form';

class DeleteCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      errors: []
    }
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.props.getCourse(this.props.location.state.courseId)
      .then( data => {
        this.setState({
          id: data.id,
        })
      } 
    )
    .catch((err) => {
      console.log(err);
      this.props.history.push('/notfound');
    });
  }

  submit() {
    this.props.deleteCourse(this.state.id, this.props.authenticatedUser.emailAddress, this.props.password)
      .then(response => {
        console.log(response);
        if (response.status === 204) {
          this.props.history.push('/courses')
        } else if (response.status === 403) {
          this.props.history.push('/forbidden');
        } else if (response.status === 404) {
          this.props.history.push('/forbidden');
        } else if (response.status === 500) {
          this.props.history.push('/error');
        }
      })
  }

  cancel() {
    this.props.history.push('/');
  }

  render() { 
    return (
      <div className="form--centered">
        <h2>Are you sure you want to delete this course?</h2>
        <Form 
          cancel={this.cancel}
          submit={this.submit}
          errors={this.state.errors}
          submitButtonText="Delete Course"
          elements={() => {}}
        />
      </div>
    );
  }
}

export default withRouter(DeleteCourse);