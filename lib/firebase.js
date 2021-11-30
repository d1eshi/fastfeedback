import * as firebase from "firebase/app"
import 'firebase/auth'
import {getAuth, GithubAuthProvider} from 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyDWw_2-2E83Mscn45io7F5JxeAZbUV7UxA',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
})

const auth = getAuth()
const provider= new GithubAuthProvider()

export {firebase, auth, provider}
