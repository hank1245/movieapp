import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const Header = () => {
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-0">
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </div>
  </div>
  )
}

export default Header