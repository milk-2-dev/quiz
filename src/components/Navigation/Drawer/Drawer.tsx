import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'
import { isAdmin } from '../../../utils/userUtils'
import { useLayoutStateContext } from '../../../contexts/LayoutContextProvider'

const Drawer = () => {
  const { activeMenu, closeMenuHandler } = useLayoutStateContext()
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            // exact={link.exact.toString()}
            className={({ isActive }) => (isActive ? classes.active : null)}
            onClick={closeMenuHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  const cls = [classes.Drawer]

  if (!activeMenu) {
    cls.push(classes.close)
  }

  const links = [{ to: '/', label: 'Home', exact: true }]

  if (isAdmin()) {
    links.push({ to: '/quiz-creator', label: 'Create quiz', exact: false })
  }

  return (
    <React.Fragment>
      <nav id={classes.mainNav} className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>

      {activeMenu ? <Backdrop onClick={closeMenuHandler} /> : null}
    </React.Fragment>
  )
}

export default Drawer
