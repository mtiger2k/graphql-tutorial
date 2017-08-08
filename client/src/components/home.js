// @flow weak

import React, {
  PureComponent
}                     from 'react';
import { Jumbotron }  from 'react-bootstrap';
import { Link }       from 'react-router-dom';

class Home extends PureComponent {
  render() {
    return(
      <Jumbotron>
        <h1>
          ReactJS + Bootstrap
        </h1>
        <h2>
          with Apollo/Graphql
        </h2>
        <h2>
          and Redux
        </h2>
        <h2>
          and React Router v4
        </h2>
        <h1>
          Starter
        </h1>
        <p>
          <Link
            className="btn btn-success btn-lg"
            to={'/about'}>
            <i className="fa fa-info" />
            &nbsp;
            go to about
          </Link>
        </p>
      </Jumbotron>
    );
  }
}

export default Home;
