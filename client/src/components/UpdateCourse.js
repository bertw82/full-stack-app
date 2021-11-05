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
    this.renderNull = this.renderNull.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.id)
      .then( data => {
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
        })
      } 
    )
    .catch((err) => {
      console.log(err);
      this.props.history.push('/notfound');
    });
  }

  componentDidUpdate() {
    this.renderNull();
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
    this.props.update(this.state.id, data, this.props.authenticatedUser.emailAddress, this.props.password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
          console.log(this.state.errors);
        } else {
          console.log('success!');
          this.props.history.push(`/courses/${this.state.id}`);
        }
      })    
  }

  cancel() {
    this.props.history.push('/');
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
    // console.log(this.state);
    // console.log(this.props.authenticatedUser);
    // console.log(this.props.match.params.id);
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