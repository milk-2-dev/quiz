import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { authFirebaseSDK } from '../firebase'

const setLocalStorageData = ({ expiresIn, email, idToken, localId }) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

  localStorage.setItem('token', idToken)
  localStorage.setItem('userId', localId)
  localStorage.setItem('expirationDate', expirationDate)
  localStorage.setItem('email', email)
}

const clearLocalStorageData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('email')
}

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => {
      if (response?._tokenResponse) {
        setLocalStorageData(response._tokenResponse)
      }
      return response
    }
  )
}

const signIn = (email, password) => {
  return signInWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => {
      debugger
      if (response?._tokenResponse) {
        setLocalStorageData(response._tokenResponse)
      }

      return response
    }
  )
}

const logout = () => {
  clearLocalStorageData()
}
const authService = {
  signUp,
  signIn,
  logout,
}
export default authService
