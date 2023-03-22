import { createContext, useContext, useEffect, useState } from 'react'
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../firebase/config/firebase'

const AuthContext = createContext({})

const provider = new GoogleAuthProvider()
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	console.log(user)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setUser({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
				})
			} else {
				setUser(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const signInWithGoogle = () => {
		return signInWithPopup(auth, provider)
			.then(result => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				// The signed-in user info.
				const user = result.user
				// IdP data available using getAdditionalUserInfo(result)
				console.log(getAdditionalUserInfo(result))
			})
			.catch(error => {
				console.log(error)
			})
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = async () => {
		setUser(null)
		await signOut(auth)
	}

	return (
		<AuthContext.Provider
			value={{ user, login, signup, logout, signInWithGoogle }}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
