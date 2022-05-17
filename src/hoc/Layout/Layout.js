import React, { useState } from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { useSelector } from 'react-redux'
import classes from './Layout.module.scss'

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
      </React.Fragment>
    )
  }

  return (
    <div className={classes.Layout}>
      <div
        className={`${classes.circle} ${classes.circle_xl} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.circle} ${classes.circle_sm} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.triangle} ${classes.triangle_sm} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.circle} ${classes.circle_sm} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.circle} ${classes.circle_xl} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.ring} ${classes.ring_sm} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.ring} ${classes.ring_sm} ${classes.random_position}`}
      ></div>
      <div
        className={`${classes.triangle} ${classes.triangle_sm} ${classes.random_position}`}
      ></div>

      {auth.isAuthenticated ? renderMenu() : null}

      <main>{children}</main>
    </div>
  )
}

export default Layout
