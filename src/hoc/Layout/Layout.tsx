import React, { FC, ReactNode, useState } from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import classes from './Layout.module.scss'
import Logout from '../../components/Navigation/Logout/Logout'
import { useAuth } from '../../hooks/useAuth'

type layoutProps = {
  children: ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  const { isAuth } = useAuth()
  const [menu, setMenu] = useState(false)

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
          // isAuthenticated={isAuth}
        />
        <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
        <Logout />
      </React.Fragment>
    )
  }

  return (
    <div className={classes.Layout}>
      {isAuth ? renderMenu() : null}
      <main>{children}</main>
    </div>
  )
}

export default Layout
