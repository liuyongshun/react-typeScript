import React, { Component } from 'react'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom'
import Main from './main'
import '../style/common.css'
// import '../style/less.less'
// import '../style/sass.scss'
// import '../style/stylus.styl'

import router from '@/router/index'

// const ReduxContext = React.createContext()
// const { Provider } = ReduxContext

class App extends Component {
  render() {
    return (
      <div>
        <Main></Main>
        <HashRouter history={hashHistory}>
          <Switch>
            {
              router.map((n, i) => (<Route path={n.path} key={i} component={n.component}></Route>))
            }
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
export default App