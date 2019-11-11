import { useState } from 'react'
import Immutable from 'immutable'

import action from './actions/index'
import dispatchs from './dispatchs/index'
import states from './states/index'

let initialState = Immutable.fromJS({
  ...states
})

export default () => {
  const [state, setState] = useState(initialState)
  const actions = action(action => {
    const { actionType } = action
    initialState = initialState.updateIn([actionType], (e) => {
      const E = e && e.toJS()
      const state = dispatchs(E, action)
      return Immutable.fromJS(state)
    })
    setState(initialState)
  })
  return [state.toJS(), actions]
}
