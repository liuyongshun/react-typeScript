/** @format */

import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  skipTo(path) {}
  render() {
    return <div onClick={this.skipTo.bind(this, 'fff')}>homfffe</div>
  }
}
export default Home
// import * as React from "react"

// export interface HelloProps { compiler: string; framework: string; }

// export class Home extends React.Component<HelloProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }
