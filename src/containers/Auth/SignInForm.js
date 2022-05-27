import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import is from 'is_js'
import Button from '../../components/UI/Button/Button'
import { signIn } from '../../features/auth/authSlice'
import classes from './Auth.module.scss'
import { useFormFields } from '../../lib/hooksLib'

const SignInForm = () => {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    handleAuthError()
  }, [authState.authError])

  const [fields, handleFieldChange, handleValidationError] = useFormFields({
    email: {
      value: '',
      errorMessage: null,
    },
    password: {
      value: '',
      errorMessage: null,
    },
    confirmPassword: '',
  })

  const handleAuthError = () => {
    if (authState.authError) {
      switch (authState.authError.message) {
        case 'EMAIL_NOT_FOUND':
          handleValidationError([
            { field: 'email', message: `Can't find user with this email` },
          ])
          break
        case 'INVALID_PASSWORD':
          handleValidationError([
            { field: 'password', message: `Invalid password` },
          ])
          break

        default:
          break
      }
    }
  }

  function validateForm() {
    let emailValidation = false
    let passwordValidation = false
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

    handleValidationError(errorData)

    const emailValidationResult = emailValidation !== false
    const passwordValidationResult = passwordValidation !== false

    return emailValidationResult && passwordValidationResult
  }

  const submitHamdler = (event) => {
    event.preventDefault()
    if (validateForm()) {
      const authData = {
        email: fields.email.value,
        password: fields.password.value,
        returnSecureToken: true,
      }

      dispatch(signIn(authData)).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={submitHamdler} action='' className={classes.AuthForm}>
        {/* {renderInputs()} */}
        <div className='form_group' size='lg'>
          {/* <label className='Form.Label'>Email</label> */}
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
          {/* <label className='Form.Label'>Password</label> */}
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

        <Button styleType='primary' type='submit'>
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default SignInForm
