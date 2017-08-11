import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderTextField } from './formHelpers'

const validate = values => {
  const errors = {}
  if (!values.dispName) {
    errors.dispName = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.role) {
    errors.role = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  if (values.confirmPassword != values.password) {
      errors.confirmPassword = 'Must match password'
    }
  return errors
}

class SignupForm extends Component {

    render() {
        const { handleSubmit, resetForm, submitting, error } = this.props;
        return (
          <div className="register-box">
            <div className="register-logo">
              <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>

            <div className="register-box-body">
              <p className="login-box-msg">Register a new membership</p>
              <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
                  <Field name="dispName" type="text" component={renderTextField} label="用户名"/>
                  <Field name="username" type="text" component={renderTextField} label="登录名"/>
                  <Field name="password" type="password" component={renderTextField} label="密码"/>
                  <Field name="confirm_password" type="password" component={renderTextField} label="确认密码"/>
              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox"/> I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                </div>
              </div>

              </form>

          <a href="/login" className="text-center">I already have a membership</a>

        </div>
      </div>
              );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'signupForm',
    validate
})(SignupForm);
