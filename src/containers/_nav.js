import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon className="cil-book" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon className="cil-book" customClasses="c-sidebar-nav-icon"/>,
  }, {
    _tag: 'CSidebarNavItem',
    name: 'Places',
    to: '/places',
    icon: <CIcon className="cil-book" customClasses="c-sidebar-nav-icon"/>,
  }, {
    _tag: 'CSidebarNavItem',
    name: 'Reservations',
    to: '/reservations',
    icon: <CIcon className="cil-book" customClasses="c-sidebar-nav-icon"/>,
  },
]

export default _nav
