import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Link } from 'react-router-dom'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';

class Feature extends Component {

  componentWillMount() {
    this.props.fetchMessage()
  }

  render() {
    return (
    <PageWrapper>
      <PageHeader
        title="Home page"
        description="Welcome to the first page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Page' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <div>
          <p><strong>Welcome to the secure page!</strong></p>
          <br/>
          <p>Here's a secret response from the server that your token returned:</p>
          ____________________________________________________________
          <p>{this.props.message}</p>
          ____________________________________________________________
          <br/>
          <p>Notice that clicking these links redirect to the homepage, as you are already signed in:</p>
          <p>
            <Link to={'/signin'}>/signin</Link> | <Link to={'/signup'}>/signup</Link>
          </p>
        </div>
      </PageContent>
    </PageWrapper>

    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message
  }
}

export default connect(mapStateToProps, actions)(Feature)