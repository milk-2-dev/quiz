import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { signOut } from '../../../store/slices/authSlice'
import classes from './Logout.module.scss'

const Logout = () => {
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useAppDispatch()
  const cls = [classes.LogoutButton, 'fas fa-sign-out-alt']

  const clickHandler = () => {
    setIsClicked(true)
    dispatch(signOut())
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
