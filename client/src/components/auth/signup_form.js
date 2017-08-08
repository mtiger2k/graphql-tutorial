import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from './form_helpers'

class SignupForm extends Component {

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">
        <strong>Oops: </strong>{this.props.errorMessage}
      </div>
    }
  }

  render() {
    const {handleSubmit} = this.props

    return (
      <div className="container-fluid">
        {this.renderAlert()}
        <form onSubmit={handleSubmit} className="well col-sm-6">

          <Field
            label="Email"
            name="email"
            component={renderTextField}
            type="text"/>

          <Field
            label="Password"
            name="password"
            component={renderTextField}
            type="password"/>

          <Field
            label="Password Confirmation"
            name="passwordConfirmation"
            component={renderTextField}
            type="password"/>

          <button type="submit" label="Sign Up" className="btn btn-default btn-flat">Sign up</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords must match'
  }

  if (!values.email) {
    errors.email = 'Please enter an email'
  }

  if (!values.password) {
    errors.password = 'Please enter a password'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please confirm your password'
  }

  return errors
}


export default reduxForm({
  form: 'signup',
  validate
})(SignupForm)