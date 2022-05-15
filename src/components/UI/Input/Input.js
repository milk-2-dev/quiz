import React from 'react'
import classes from './Input.module.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Field cannot be empty'}</span>
      ) : null}
    </div>
  )
}

export default Input
