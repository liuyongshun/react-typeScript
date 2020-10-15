/** @format */

import React, { Component } from 'react'
// import { withSubscription } from '@/components/Hoc.js'
const getMemberSettingHoc = Component => {
  return class ContainerComponent extends React.Component {
    componentDidMount() {
      console.log(3333)
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
// import './home.scss'
// class Home extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       Text: ''
//     }
//   }
//   skipTo(path) {
//     debugger
//   }
//   dynamicClick() {
//     import('../dynamic').then(res => {
//       this.setState({
//         Text: res.default
//       })
//     })
//   }
//   render() {
//     const { Text } = this.state
//     return (
//       <div className="red" onClick={this.skipTo.bind(this, 'fff')}>
//         homfffe
//         <div onClick={this.dynamicClick.bind(this)}>动态</div>
//         {Text ? <Text></Text> : ''}
//       </div>
//     )
//   }
// }
class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>homfffe</div>
  }
}
// export default Home
// import * as React from "react"

// export interface HelloProps { compiler: string; framework: string; }

// export class Home extends React.Component<HelloProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }

export default getMemberSettingHoc(Home)
