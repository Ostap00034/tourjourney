import Head from 'next/head'
import { useAuth } from '@/context/AuthContext'
import addRData from '../firebase/realtimedatabase/database'
import { db } from '@/firebase/config/firebase'
import { onValue, ref } from 'firebase/database'

const Home = () => {
	const ser = ref(db, '/users')
	onValue(ser, snapshot => {
		const data = snapshot.val()
		console.log(data)
	})
	const { user } = useAuth()
	return (
		<>
			<Head>
				<title>Tour Journey</title>
			</Head>
			{user ? user + '' : ''}
			<h1
				onClick={async () => {
					const result = await addRData('name', 'emailhui')
					console.log(user)
					console.log(result)
				}}>
				test
			</h1>
		</>
	)
}

export default Home
