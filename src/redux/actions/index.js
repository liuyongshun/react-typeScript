import UserAction from './user'
import RouterAction from './router'

export default (dispatchFun) => {
  return {
    user: UserAction(dispatchFun),
    router: RouterAction(dispatchFun)
  }
}