import React, { useState, useEffect, useContext, createContext } from 'react';
import {firebase, auth, provider} from './firebase';
import {onAuthStateChanged, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth'

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log(user);

  const signinWithGithub = () => {
    signInWithPopup(auth, provider) 
      .then((result)=> {
        setUser(result.user)
        return result.user
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error) 
        throw new Error(errorMessage, errorCode)
      })
  };

  const signout = () => {
    console.log('try to signout')
    signOut(auth).then(() => {
      setUser(null)
    // Sign-out successful.
    }).catch((error) => {
      // an error happened.
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}