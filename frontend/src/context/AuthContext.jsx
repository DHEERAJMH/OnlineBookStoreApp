import { createContext,useContext, useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();


export const AuthProvide = ({children})=>{

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // register user
    const registerUser = async (email,password) =>{
        return await createUserWithEmailAndPassword(auth,email,password);
    }

    // login user
    const loginUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // signup with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // logout
    const logout = ()=>{
        return signOut(auth);
    }

    // mange user state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false);

            if(user){
                const {email,displayName,photoURL} = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL
                }
            }
        })

        return () => unsubscribe();
    },[])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}