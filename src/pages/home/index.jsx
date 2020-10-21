import React, { useState, useEffect } from 'react'
import { login } from '@/API/login'
import Utils from '@/utils'

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
    <div>
      当前是否登陆
      {isLogin ? '是' : '否'}
      当前时间 {Utils.getTime()}
    </div>
  )
}

export default Home
