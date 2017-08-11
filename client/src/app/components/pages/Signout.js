import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Redirect } from 'react-router-dom'

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser()
  }

  render() {
    return <Redirect to='/'/>
  }
}

export default connect(null, actions)(Signout)
