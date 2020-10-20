import React, { PureComponent } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import img from '@/assets/images/gg.png'
import Main from './main'
import '../style/common.less'

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
