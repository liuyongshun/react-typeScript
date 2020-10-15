import React, { PureComponent } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import router from '@/router/index'

console.log(router, 'llfsdl')

class Main extends PureComponent {
  dd = () => {}

  render() {
    return (
      <Switch>
        {router.map(n => (
          <Route exact={n.exact} path={n.path} key={n.path} component={n.component} />
        ))}
        <Redirect to="/404" />
      </Switch>
    )
  }
}
export default Main
