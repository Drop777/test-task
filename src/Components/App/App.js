/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router';
import { Users } from '../Users/index';
import { Posts } from '../Posts/index';
import { Details } from '../Details/index';

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/users/:userId?/posts/:postId?/details" render={(match) => <Details match={match} />} />
          <Route path="/users/:userId?/posts" render={(match) => <Posts match={match} />} />
          <Route path="/" component={Users} />
        </Switch>
      </>
    );
  }
}

export default App;
