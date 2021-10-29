import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      description : '',
      materialsNeeded : '',
      estimatedTime : '',
      errors: []
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }
 

  submit() {
    const authUser = this.props.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    this.props.createCourse(course, authUser.emailAddress, this.props.password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
          console.log(this.state.errors)
        } else {
          console.log('success!');
          this.props.history.push('/courses');
        }
      })
  }

  cancel() {
    this.props.history.push('/');
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

  render() {
    // console.log(this.props);
    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form 
          cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={ () => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                  <label htmlFor="title">Course Title</label>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      // value={courseTitle}
                      value={this.state.title}
                      onChange={this.change} />
                      
                    <p>By </p>

                    <label htmlFor="description">Course Description</label>
                    <textarea 
                      id="description" 
                      name="description"
                      // value={courseDescription}
                      value={this.state.description}
                      onChange={this.change}
                    />
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
            )}
        />
      </div>
    );
  }
}

export default CreateCourse;