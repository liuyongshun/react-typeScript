/*
* @Created by bi
* @Date: 2019/6/12
* @Name: router
* */

export default {
  'SET_ROUTER_LIST': (state, data) => {
    return Object.assign({}, state, {
      objList: data
    })
  }
}