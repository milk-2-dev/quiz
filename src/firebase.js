import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ReactObserver from 'react-event-observer'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const authFirebaseSDK = getAuth(app)
export const firebaseObserver = ReactObserver()
// onAuthStateChanged(authFirebaseSDK, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     // const uid = user.uid
//     console.log(user)
//     setLogedIn(true)
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// })

authFirebaseSDK.onAuthStateChanged(function (user) {
  firebaseObserver.publish('authStateChanged', isLoggedIn())
})

export function isLoggedIn() {
  return !!authFirebaseSDK.currentUser
}
