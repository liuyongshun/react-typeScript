/** @format */

import Home from '@/pages/home/index'
import Nav from '@/components/nav'
import Profile from '@/pages/profile/index'
import Message from '@/pages/message/index'
import Gallery from '@/pages/gallery/index'

export default [
  {
    path: '/',
    exact: true,
    name: 'nav',
    component: Nav,
  },
  {
    path: '/home',
    exact: true,
    name: 'homePage',
    component: Home,
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/message',
    exact: true,
    name: 'Message',
    component: Message,
  },
  {
    path: '/gallery',
    exact: true,
    name: 'Gallery',
    component: Gallery,
  },
]
