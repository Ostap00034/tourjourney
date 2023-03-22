import Head from 'next/head'
import { useAuth } from '@/context/AuthContext'
import addData from '../firebase/realtimedatabase/database'
import { db } from '@/firebase/config/firebase'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const Home = () => {
	const [datas, setDatas] = useState([])

	useEffect(() => {
		const query = ref(db, '/users/')
		let arr = []
		onValue(query, snapshot => {
			const data = snapshot.val()
			// console.log(data)
			for (var i in data) {
				arr.push(data[i])
			}
		})
		setDatas(arr)
	})
	const { user } = useAuth()
	return (
		<>
			<Head>
				<title>Tour Journey</title>
			</Head>
			{user ? user.email + '' : ''}
			<h1
				onClick={async () => {
					const result = await addData('name', 'emailhui', user.uid)
					console.log(user)
					console.log(result)
				}}>
				test
			</h1>
			<div className='flex text-[30px] flex-col bg-purple-700 h-[400px] w-full p-20'>
				{datas.map(item => (
					<div key={Math.random()} className=''>
						{item.username}
						<br></br>
						{item.email}
					</div>
				))}
			</div>
		</>
	)
}

export default Home
