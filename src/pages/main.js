/** @format */

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import router from '@/router/index'

class Main extends Component {
  dd() {}

  render() {
    return (
      <Switch>
        {router.map((n, i) => (
          <Route exact={n.exact} path={n.path} key={i} component={n.component} />
        ))}
        <Redirect to="/404" />
      </Switch>
    )
  }
}
export default Main
