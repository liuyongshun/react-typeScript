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
      ggggg放水淀粉色更多风格fgdg速度放水淀粉放水淀粉水淀粉的说法是广告
      {isLogin ? '是' : '否'}
      当前时间 {getTime()}刘永顺二傻子放水淀粉
    </div>
  )
}

export default Home
