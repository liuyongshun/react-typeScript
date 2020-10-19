import React, { PureComponent } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from './main'
import '../style/common.less'
import img from '@/assets/images/gg.png'

class App extends PureComponent {
  render() {
    return (
      <div className="use">
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
        <img src={img} alt="" />
      </div>
    )
  }
}
export default App
