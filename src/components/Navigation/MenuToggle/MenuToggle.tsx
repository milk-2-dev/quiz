import React from 'react'
import { useLayoutStateContext } from '../../../contexts/LayoutContextProvider'
import classes from './MenuToggle.module.css'

const MenuToggle = () => {
  const { activeMenu, toggleMenuHandler } = useLayoutStateContext()
  const cls = [classes.MenuToggle, 'fa']

  if (activeMenu) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  return <i className={cls.join(' ')} onClick={toggleMenuHandler} />
}

export default MenuToggle
