import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userId: '',
      title: '',
      description: '',
      materialsNeeded: '',
      estimatedTime: '',
      firstName: '',
      lastName: '',
      errors: [],
      loading: true
   
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
  }

  componentDidMount() {
    // get course to update
    this.props.getCourse(this.props.match.params.id)
      .then(response => {
        if (response.status === 404) {
          this.props.history.push('/notfound');
        } else if (response.status === 500) {
          this.props.history.push('/error');
        } else if (response.status === 200) {
          return response.json().then(data => {
            if (data.materialsNeeded === null && data.estimatedTime === null) {
              this.setState({
                userId: data.userId,
                id: data.id,
                title: data.title,
                description: data.description,
                estimatedTime: '',
                materialsNeeded: '',
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                loading: false
              });
            } else if (data.materialsNeeded === null) {
              this.setState({
                materialsNeeded: '',
                userId: data.userId,
                id: data.id,
                title: data.title,
                description: data.description,
                estimatedTime: data.estimatedTime,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                loading: false
              });
            } else if (data.estimatedTime === null ) {
              this.setState({
                userId: data.userId,
                id: data.id,
                title: data.title,
                description: data.description,
                materialsNeeded: data.materialsNeeded,
                estimatedTime: '',
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                loading: false
              });
            } else {
              this.setState({
                userId: data.userId,
                id: data.id,
                title: data.title,
                description: data.description,
                materialsNeeded: data.materialsNeeded,
                estimatedTime: data.estimatedTime,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                loading: false
              });
            }
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

  change(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // function to update the course
  async updateCourse(path, data, emailAddress, password) {
    const response = await this.props.api(`/courses/${path}`, 'PUT', data, true, { emailAddress, password});
    return response;
  }

  submit() {
    // let data;
    // if (this.state.estimatedTime === '') {
    //   this.setState({
    //     estimatedTime: null
    //   });
    // } else if (this.state.materialsNeeded === '') {
    //   this.setState({
    //     materialsNeeded: null
    //   })
    // } else {
    //   data = this.state;
    // }
    const data = this.state;
    console.log(data);
    this.updateCourse(this.state.id, data, this.props.authenticatedUser.emailAddress, this.props.password)
      .then(response => {
        if (response.status === 204) {
          this.props.history.push(`/courses/${this.state.id}`);
        } else if (response.status === 401 || response.status === 400) {
          return response.json().then(data => {
            this.setState({ errors: data.errors });
          });
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
    this.props.history.push(`/courses/${this.state.id}`);
  }

  renderForm() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    
    return (
      <>
      { (this.props.authenticatedUser.id === this.state.userId)
      ? <div className="wrap">
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
                  
                <p>By { this.state.firstName + ' ' + this.state.lastName }</p>

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
      : <Redirect to="/forbidden" />
      }
      </>
    );
  }

  render() {
    console.log(this.state.estimatedTime);
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

export default withRouter(UpdateCourse);