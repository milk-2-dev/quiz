import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  })
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default Logout
