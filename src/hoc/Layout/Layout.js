import React, { useState } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { useSelector } from 'react-redux'

function Layout({ children }) {
  const [menu, setMenu] = useState(false)
  const auth = useSelector((state) => state.auth)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const onCloseHandler = () => {
    setMenu(false)
  }

  return (
    <div className={classes.Layout}>
      <Drawer
        isOpen={menu}
        onClose={onCloseHandler}
        isAuthenticated={auth.isAuthenticated}
      />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
