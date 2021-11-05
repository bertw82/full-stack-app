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
      userId: props.authenticatedUser.id,
      errors: []
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.createCourse = this.createCourse.bind(this);
  }
  

  // create a new course
  async createCourse(course, emailAddress, password) {
    const response = await this.props.api('/courses', 'POST', course, true, {emailAddress, password});
    return response;
  }


  submit() {
    const authUser = this.props.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    this.createCourse(course, authUser.emailAddress, this.props.password)
      .then(response => {
        if (response.status === 201) {
          this.props.history.push('/courses');
        } else if (response.status === 500) {
          this.props.history.push('/error');
        } else {
          return response.json().then(data => {
            this.setState({ errors: data.errors });
          });
        }
      }) 
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
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
    const user = this.props.authenticatedUser.firstName + ' ' + this.props.authenticatedUser.lastName;
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
                      value={this.state.title}
                      onChange={this.change} />
                      
                    <p>By {user}</p>

                    <label htmlFor="description">Course Description</label>
                    <textarea 
                      id="description" 
                      name="description"
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
                      value={this.state.estimatedTime}
                      onChange={this.change} />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
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