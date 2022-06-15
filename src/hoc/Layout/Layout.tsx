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
        <header id={classes.pageHeader}>
          <MenuToggle />
          <Logout />
        </header>
        <Drawer />
      </React.Fragment>
    )
  }

  return (
    <div className={classes.Layout}>
      <LayoutContextProvider>
        {isAuth ? renderMenu() : null}
        <main id={classes.mainContent}>{children}</main>
      </LayoutContextProvider>
    </div>
  )
}

export default Layout
