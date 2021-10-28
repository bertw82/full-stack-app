import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseTitle : '',
      courseDescription : '',
      materialsNeeded : '',
      estimatedTime : ''
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }
 

  submit() {

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
    console.log(this.props);
    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form 
          cancel={this.cancel}
            // errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
                      
                    <p>By </p>

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
            )}
        />
      </div>
    );
  }
}

export default CreateCourse;