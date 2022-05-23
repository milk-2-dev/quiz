import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logout } from '../../../features/auth/authSlice'
import classes from './Logout.module.scss'

const Logout = () => {
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useDispatch()
  const cls = [classes.LogoutButton, 'fas fa-sign-out-alt']

  const clickHandler = () => {
    setIsClicked(true)
    dispatch(logout())
  }

  return (
    <React.Fragment>
      {isClicked ? (
        <Navigate to='/' replace />
      ) : (
        <i onClick={clickHandler} className={cls.join(' ')}></i>
      )}
    </React.Fragment>
  )
}

export default Logout
