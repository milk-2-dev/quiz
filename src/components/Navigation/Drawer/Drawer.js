import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

const Drawer = (props) => {
  const clickHandler = () => {
    props.onClose()
  }

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact.toString()}
            className={({ isActive }) => (isActive ? classes.active : null)}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  const cls = [classes.Drawer]

  if (!props.isOpen) {
    cls.push(classes.close)
  }

  const links = [{ to: '/', label: 'Home', exact: true }]

  const userMail = localStorage.getItem('email')

  if (userMail === process.env.REACT_APP_ADMIN_EMAIL) {
    links.push({ to: '/quiz-creator', label: 'Create quiz', exact: false })
  }

  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>

      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </React.Fragment>
  )
}

export default Drawer
