import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.location.state.courseId,
      courseTitle: this.props.location.state.courseTitle,
      courseDescription: this.props.location.state.courseDescription,
      materialsNeeded: this.props.location.state.materialsNeeded,
      estimatedTime: this.props.location.state.estimatedTime,
      // errors: []
   
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
    this.props.update(this.state.courseId, data);
    this.props.history.push(`/courses/${this.state.courseId}`);
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    // const errors = this.state.errors;
    //  console.log(this.state.materialsNeeded);
    console.log(this.props);
    return (
        <div className="wrap">
          <h2>Update Course</h2>
          <Form
            cancel={this.cancel}
            // errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={ () => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input 
                      id="courseTitle" 
                      name="courseTitle" 
                      type="text" 
                      // value={courseTitle}
                      value={this.state.courseTitle}
                      onChange={this.change} />
                      
                    <p>By { this.props.location.state.course.user.firstName + ' ' + this.props.location.state.course.user.lastName }</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea 
                      id="courseDescription" 
                      name="courseDescription"
                      // value={courseDescription}
                      value={this.state.courseDescription}
                      onChange={this.change}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      // value={estimatedTime}
                      value={this.state.estimatedTime}
                      onChange={this.change} />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
                      // value={materialsNeeded}
                      value={this.state.materialsNeeded}
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