import React, { PureComponent } from 'react'
import { getTime } from '@/utils'

class Profile extends PureComponent {
  render() {
    return (
      <ul>
        <li>profile{getTime()}</li>
      </ul>
    )
  }
}
export default Profile
