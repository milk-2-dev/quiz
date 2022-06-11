import React from 'react'
import { useDispatch } from 'react-redux'
import classes from './Auth.module.scss'
import is from 'is_js'
import Button from '../../components/UI/Button/Button'
import { signUp } from '../../store/slices/authSlice'
import { useFormFields } from '../../lib/hooksLib'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [fields, handleFieldChange, handleValidationError] = useFormFields({
    email: {
      value: '',
      errorMessage: null,
    },
    password: {
      value: '',
      errorMessage: null,
    },
    confirmPassword: {
      value: '',
      errorMessage: null,
    },
  })

  function validateForm() {
    let emailValidation = false
    let passwordValidation = false
    let confirmPasswordValidation = false

    const errorData = []

    if (fields.email.value.length > 0) {
      if (is.email(fields.email.value)) {
        emailValidation = true
      } else {
        errorData.push({
          field: 'email',
          message: `Must be an 'Email' format`,
        })
      }
    } else {
      // handleValidationError({ field: 'email', message: `Can't be an ampty` })
      errorData.push({ field: 'email', message: `Can't be an ampty` })
    }

    if (fields.password.value.length > 0) {
      if (fields.password.value.length >= 6) {
        passwordValidation = true
      } else {
        errorData.push({
          field: 'password',
          message: `Min length for the passwor is 6 chars`,
        })
      }
    } else {
      //handleValidationError({ field: 'password', message: `Can't be an ampty` })
      errorData.push({ field: 'password', message: `Can't be an ampty` })
    }

    if (fields.confirmPassword.value.length > 0) {
      if (fields.confirmPassword.value === fields.password.value) {
        confirmPasswordValidation = true
      } else {
        errorData.push({
          field: 'confirmPassword',
          message: `Confirm password mast be the same as password`,
        })
      }
    } else {
      //handleValidationError({ field: 'password', message: `Can't be an ampty` })
      errorData.push({ field: 'confirmPassword', message: `Can't be an ampty` })
    }

    handleValidationError(errorData)

    const emailValidationResult = emailValidation !== false
    const passwordValidationResult = passwordValidation !== false
    const confirmpPsswordValidationResult = confirmPasswordValidation !== false

    return (
      emailValidationResult &&
      passwordValidationResult &&
      confirmpPsswordValidationResult
    )
  }

  const submitHamdler = (event) => {
    event.preventDefault()
    if (validateForm()) {
      const authData = {
        email: fields.email.value,
        password: fields.password.value,
      }

      dispatch(signUp(authData))
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={submitHamdler} action='' className={classes.AuthForm}>
        <div className='form_group' size='lg'>
          <input
            className='form_control'
            autoFocus
            type='text'
            placeholder='Email'
            controlid='email'
            value={fields.email.value}
            onChange={handleFieldChange}
          />

          {fields.email.errorMessage ? (
            <div className='invalid_feedback'>{fields.email.errorMessage}</div>
          ) : null}
        </div>

        <div className='form_group' size='lg'>
          <input
            className='form_control'
            type='password'
            placeholder='Password'
            controlid='password'
            value={fields.password.value}
            onChange={handleFieldChange}
          />

          {fields.password.errorMessage ? (
            <div className='invalid_feedback'>
              {fields.password.errorMessage}
            </div>
          ) : null}
        </div>

        <div className='form_group' size='lg'>
          <input
            className='form_control'
            type='password'
            placeholder='Confirm password'
            controlid='confirmPassword'
            value={fields.confirmPassword.value}
            onChange={handleFieldChange}
          />

          {fields.confirmPassword.errorMessage ? (
            <div className='invalid_feedback'>
              {fields.confirmPassword.errorMessage}
            </div>
          ) : null}
        </div>

        <Button styleType='primary' type='submit'>
          Sign up
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
