// import Home from '@/pages/home/index'
import React from 'react'

const Home = React.lazy(() => import('@/pages/home/index'))
const Profile = React.lazy(() => import('@/pages/profile/index'))
const Message = React.lazy(() => import('@/pages/message/index'))
const Gallery = React.lazy(() => import('@/pages/gallery/index'))
// import Nav from '@/components/nav'

export default [
  // {
  //   path: '/',
  //   exact: true,
  //   name: 'nav',
  //   component: Nav
  // },
  {
    path: '/',
    exact: true,
    name: 'homePage',
    component: Home
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: Profile
  },
  {
    path: '/message',
    exact: true,
    name: 'Message',
    component: Message
  },
  {
    path: '/gallery',
    exact: true,
    name: 'Gallery',
    component: Gallery
  }
]
