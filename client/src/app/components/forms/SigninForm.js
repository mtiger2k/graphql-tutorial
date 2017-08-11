import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderTextField } from './formHelpers'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  return errors
}


class SigninForm extends Component {

	renderAlert() {
	    if (this.props.errorMessage) {
	      return <div className="alert alert-danger">
	        <strong>Oops: </strong>{this.props.errorMessage}
	      </div>
	    }
	}

    render() {
        const { handleSubmit, resetForm, submitting, error } = this.props;
        return (
			<div className="login-box">
			  <div className="login-logo">
			    <a href="../../index2.html"><b>Admin</b>LTE</a>
			  </div>
			  <div className="login-box-body">
			    <p className="login-box-msg">Sign in to start your session</p>
	            <form onSubmit={handleSubmit}>
	            {this.renderAlert()}
	                <Field name="email" type="text" component={renderTextField} label="邮箱"/>
	                <Field name="password" type="password" component={renderTextField} label="密码"/>
	            <div className="row">
	                <div className="col-xs-4 pull-right">
	                    <button type="submit" disabled={submitting} className="btn btn-primary btn-block btn-flat">{submitting?'正在登录': '登录'}</button>
	                </div>
	            </div>
	            </form>

			    <a href="#">I forgot my password</a><br/>
			    <a href="/signup" className="text-center">Register a new membership</a>

			  </div>
			</div>
		);
    }
}

export default reduxForm({
  form: 'signin',
  validate
})(SigninForm)
