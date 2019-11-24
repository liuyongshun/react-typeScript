/** @format */

import React, {Component} from 'react'
const list = [
  {
    name: 'home',
    path: '/home',
  },
  {
    name: 'profile',
    path: '/profile',
  },
  {
    name: 'message',
    path: '/message',
  },
  {
    name: 'gallery',
    path: '/gallery',
  },
]

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  skipTo(path) {
    console.log(path)
    console.log(this.props)
  }
  render() {
    return (
      <ul>
        {list.map((n, i) => (
          <li key={i} onClick={this.skipTo.bind(this, n.path)}>
            {n.name}
          </li>
        ))}
      </ul>
    )
  }
}
export default Nav
