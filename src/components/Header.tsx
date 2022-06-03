import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import {deleteUserInfo} from '../features/userSlice'
import { RootState } from '../app/store';

interface Props {}

const Header = () => {
  
  const user = localStorage.getItem('user')
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    (<div className="navbar bg-base-100">
    <div className="flex-1">
      <Link to='/' className="btn btn-ghost normal-case text-xl">FindUrM</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-0">
          {user ? 
        (
            <>
                <button className='btn rounded-pill text-xl' onClick={() => {
                localStorage.removeItem('user')
                dispatch(deleteUserInfo())
                signOut(auth)
                navigate('/')
                }}>Sign out of Firebase</button>
            </>
        )
          : (
            <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </>   
          )}
      </ul>
    </div>
  </div>)
  )
}

export default Header