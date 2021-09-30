import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from 'pages/login';
import ToDoPage from 'pages/todos';
import FourOhFour from 'pages/fourOhFour';

import './App.scss';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" component={ToDoPage}/>
          <Route path="*" component={FourOhFour} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
