import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { routes } from '../router'
class App extends Component {
  render() {
    return (
      <Switch>
        {routes.map((n, i) => {
          <Route key={i} path={n.path} component={n.component} />
        })}
        <Redirect to={'/404'} />
      </Switch>
    )
  }
}
export default App
