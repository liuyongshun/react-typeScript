/*
* @Created by bi
* @Date: 2019/6/12
* @Name: router
* */

export default (dispatchFun) => {
  let actionTypeDispatchFun = e => dispatchFun({
    ...e,
    actionType: 'router'
  })
  return {
    setRouter: data => {
      actionTypeDispatchFun({
          TYPE: 'SET_ROUTER_LIST',
          DATA: data
      })
    }
  }
}
