import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import ProtectedRoute from '@/components/ProtectedRoute'
import Nav from '@/components/Header/Nav'

const noAuthRequired = ['/', '/login', '/signup', '/bases']

const App = ({ Component, pageProps }) => {
	const router = useRouter()
	return (
		<AuthContextProvider>
			<Nav />
			{noAuthRequired.includes(router.pathname) ? (
				<Component {...pageProps} />
			) : (
				<ProtectedRoute>
					<Component {...pageProps} />
				</ProtectedRoute>
			)}
		</AuthContextProvider>
	)
}

export default App
