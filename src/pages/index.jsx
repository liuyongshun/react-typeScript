import React, { PureComponent, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import img from '@/assets/images/gg.png'
import Utils from '@/utils'
import Main from './main'
import '../style/common.less'

class App extends PureComponent {
  render() {
    return (
      <div className="use">
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                path="/"
                component={props => {
                  return <Main {...props} />
                }}
              />
            </Switch>
          </Suspense>
        </HashRouter>
        <img src={img} alt="" />
        {Utils.getTime()}
      </div>
    )
  }
}
export default App
