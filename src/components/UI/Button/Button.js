import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
  const buttonClasses = [classes.Button, classes[props.styleType]]
  return (
    <button
      onClick={props.onClick}
      className={buttonClasses.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
