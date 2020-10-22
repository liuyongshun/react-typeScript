import React, { useState, useEffect } from 'react'
import { login } from '@/API/login'
import { getTime } from '@/utils'
import './home.less'

const Home = () => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    login({
      userName: '七月',
      password: 'kuaile0333'
    }).then(res => {
      setIsLogin(true)
      console.log(res)
    })
  }, [])
  return (
    <div className="set-font">
      当前是否登陆dfgfgdfg个地方地方广东富豪发生的
      {isLogin ? '是' : '否'}
      当前时间 {getTime()}
    </div>
  )
}

export default Home
