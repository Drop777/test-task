/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router';
import { Users } from '../Users/index';
import { Posts } from '../Posts/index';
import { Details } from '../Details/index';

const App = () => (
  <>
    <Switch>
      <Route path="/:userId?/posts/:postId?/details" render={(match) => <Details match={match} />} />
      <Route path="/:userId?/posts" render={(match) => <Posts match={match} />} />
      <Route path="/" component={Users} />
    </Switch>
  </>
);

export default App;
