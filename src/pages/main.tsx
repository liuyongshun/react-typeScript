/** @format */

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import router from '@/router/index'
class Main extends Component {
  dd() {
    console.log('fsdfsdf')
  }
  render() {
    return (
      <Switch>
        {router.map((n, i) => (
          <Route path={n.path} key={i} component={n.component}></Route>
        ))}
        <Redirect to={'/404'} />
      </Switch>
    )
  }
}
export default Main
