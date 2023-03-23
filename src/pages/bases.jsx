import { db } from '@/firebase/config/firebase'
import { onValue, ref } from 'firebase/database'
import Image from 'next/image'
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
	}, [])
	return (
		<div className='flex flex-row flex-wrap justify-center gap-[12px] p-[30px]'>
			{datas.map(item => (
				<div
					key={item.authorId}
					className='bg-[#0F1C2A] flex flex-col gap-[12px] text-white font-jost font-normal leading-[20px] rounded-[12px]'>
					<Image
						src='/base.jpg'
						width='300'
						height='100'
						alt=''
						className='rounded-t-[12px]'
					/>
					<h1 className='text-[16px] pl-[24px]'>Турбаза {item.title}</h1>
					<p className='text-[16px] pl-[24px]'>
						Место нахождения: {item.location}
					</p>
					<p className='text-[16px] pl-[24px]'>Рейтинг 4/5</p>
					<p className='text-[16px] pl-[24px]'>Описание: {item.description}</p>
					<p className='text-[16px] pl-[24px] font-medium pb-[12px]'>
						5000рублей
					</p>
				</div>
			))}
		</div>
	)
}

export default Bases
