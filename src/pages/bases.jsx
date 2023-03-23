import { db } from '@/firebase/config/firebase'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

const Bases = () => {
	const [datas, setDatas] = useState([])

	useEffect(() => {
		const query = ref(db, '/bases/')
		let arr = []
		onValue(query, snapshot => {
			const data = snapshot.val()
			for (var i in data) {
				arr.push(data[i])
			}
		})
		setDatas(arr)
	}, [datas])
	return (
		<div className='flex flex-col'>
			{datas.map(item => (
				<div key={item.title} className=''>
					{item.title}
					{item.location}
					{item.description}
				</div>
			))}
		</div>
	)
}

export default Bases
