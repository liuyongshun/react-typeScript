export default (dispatchFun) => {
  let actionTypeDispatchFun = e => dispatchFun({
    ...e,
    actionType: 'user'
  })
  return {
    add: data => {
      actionTypeDispatchFun({
        TYPE: 'USER_ADD',
        DATA: data
      })
    }
  }
}