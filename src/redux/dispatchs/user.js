export default {
  'USER_ADD': (state, data) => {
    return Object.assign({}, state, {
      name: data
    })
  }
}