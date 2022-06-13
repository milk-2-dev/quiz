import React, { FC, ReactNode } from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import classes from './Layout.module.scss'
import Logout from '../../components/Navigation/Logout/Logout'
import { useAuth } from '../../hooks/useAuth'
import { LayoutContextProvider } from '../../contexts/LayoutContextProvider'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isAuth } = useAuth()

  const renderMenu = () => {
    return (
      <React.Fragment>
        <LayoutContextProvider>
          <Drawer />
          <MenuToggle />
          <Logout />
        </LayoutContextProvider>
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
