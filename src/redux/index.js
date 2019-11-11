/*
 * 统一组件通信.
 * by: bichaorui
 * */

import React from 'react'

import store from './store'

const ReduxContext = React.createContext()
const { Provider } = ReduxContext

const ProviderProps = props => {
  const { children } = { ...props }
  const [Store, Action] = store()
  return <Provider value={{ Store, Action }}>{children}</Provider>
}

export {
  ProviderProps, // 插入
  ReduxContext // 读取
}
