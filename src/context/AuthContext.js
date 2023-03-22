import { createContext, useContext, useEffect, useState } from 'react'
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithRedirect,
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
		return signInWithRedirect(auth, provider)
			.then(result => {
				const credential = GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				const user = result.user
				// IdP data available using getAdditionalUserInfo(result)
				console.log('sdlfkjsalkdfjasdlk;fj')
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
