import React, { PureComponent } from 'react'
import Utils from '@/utils'

class Profile extends PureComponent {
  render() {
    return (
      <ul>
        <li>profile{Utils.getTime()}</li>
      </ul>
    )
  }
}
export default Profile
