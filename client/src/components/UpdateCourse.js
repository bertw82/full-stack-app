import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.location.state.courseId,
      title: this.props.location.state.courseTitle,
      description: this.props.location.state.courseDescription,
      materialsNeeded: this.props.location.state.materialsNeeded,
      estimatedTime: this.props.location.state.estimatedTime,
      errors: []
   
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  change(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit() {
    const data = this.state;
    console.log(data);
    this.props.update(this.state.courseId, data, this.props.authenticatedUser.emailAddress, this.props.password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
          console.log(this.state.errors);
        } else {
          console.log('success!');
          this.props.history.push(`/courses/${this.state.courseId}`);
        }
      })    
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    // const errors = this.state.errors;
    //  console.log(this.state.materialsNeeded);
    // console.log(this.props);
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
        <div className="wrap">
          <h2>Update Course</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={ () => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                    <label htmlFor="title">Course Title</label>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      value={title}
                      onChange={this.change} />
                      
                    <p>By { this.props.location.state.course.user.firstName + ' ' + this.props.location.state.course.user.lastName }</p>

                    <label htmlFor="description">Course Description</label>
                    <textarea 
                      id="description" 
                      name="description"
                      value={description}
                      onChange={this.change}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      value={estimatedTime}
                      onChange={this.change} />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
                      value={materialsNeeded}
                      onChange={this.change}
                    />
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
    );
  }
}

export default withRouter(UpdateCourse);