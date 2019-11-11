
import UserDispatch from './user'
import AppDispatch from './app'
import RouterDispatch from './router'

const dispatch = {
  ...RouterDispatch,
  ...UserDispatch,
  ...AppDispatch
};

export default (state, action) => {
  const { DATA, TYPE } = action
  return dispatch[TYPE](state, DATA)
}