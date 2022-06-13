import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { authFirebaseSDK } from '../firebase'

const setLocalStorageData = (localId: string) => {
  localStorage.setItem('userId', localId)
}

const clearLocalStorageData = () => {
  localStorage.removeItem('userId')
}

type authFunc = (email: string, password: string) => {}

const signUp: authFunc = (email, password) => {
  return createUserWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => setLocalStorageData(response.user.uid)
  )
}

const signIn: authFunc = (email, password) => {
  return signInWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => setLocalStorageData(response.user.uid)
  )
}

const singOut = () => {
  signOut(authFirebaseSDK).then(() => clearLocalStorageData())
}

const autoSingOut = () => {
  clearLocalStorageData()
}

const authService = {
  signUp,
  signIn,
  singOut,
  autoSingOut,
}
export default authService
