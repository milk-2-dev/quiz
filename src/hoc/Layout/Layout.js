import React, { useState } from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { useSelector } from 'react-redux'
import classes from './Layout.module.scss'
import Logout from '../../components/Navigation/Logout/Logout'

function Layout({ children }) {
  const [menu, setMenu] = useState(false)
  const auth = useSelector((state) => state.auth)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const onCloseHandler = () => {
    setMenu(false)
  }

  const renderMenu = () => {
    return (
      <React.Fragment>
        <Drawer
          isOpen={menu}
          onClose={onCloseHandler}
          isAuthenticated={auth.isAuthenticated}
        />
        <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
        <Logout />
      </React.Fragment>
    )
  }

  return (
    <div className={classes.Layout}>
      {auth.isAuthenticated ? renderMenu() : null}
      <main>{children}</main>
    </div>
  )
}

export default Layout
