import Home from '@/pages/home/index'
import Profile from '@/pages/profile/index'
import Message from '@/pages/message/index'
import Gallery from '@/pages/gallery/index'

export default [
  {
    path: '/',
    exact: true,
    name: 'homePage',
    component: Home
  },
  {
    path: '/home',
    exact: true,
    name: 'homePage',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  }
]