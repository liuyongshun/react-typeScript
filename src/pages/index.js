import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from './main'
import '../style/common.css'
// import '../style/less.less'
// import '../style/sass.scss'
// import '../style/stylus.styl'

class App extends Component {
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
