import React, { PureComponent } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from './main'
import '../style/common.less'

class App extends PureComponent {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route
              path="/"
              component={props => {
                return <Main {...props} />
              }}
            />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
export default App
