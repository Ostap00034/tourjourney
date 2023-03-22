import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { storage } from '@/firebase/config/firebase'
import {
	getDownloadURL,
	uploadBytesResumable,
	ref,
	uploadBytes,
} from 'firebase/storage'
import { AddBases } from '@/firebase/realtimedatabase/database'
import cuid from 'cuid'

const AddBase = () => {
	const { user } = useAuth()
	const router = useRouter()

	const [progress, setProgress] = useState(0)
	const [urls, setUrls] = useState([])

	const [data, setData] = useState({
		title: '',
		location: '',
		description: '',
		images: [],
		categorie1: false,
		categorie2: false,
		categorie3: false,
		categorie4: false,
	})

	if (!user) {
		router.push('/login')
	}

	const uploadFile = async imageUpload => {
		const storageRef = ref(storage, `bases/${cuid()}`)
		if (imageUpload == null) return
		await uploadBytes(storageRef, imageUpload).then(snapshot => {
			getDownloadURL(snapshot.ref)
				.then(url => {
					setUrls(prev => [...prev, url])
				})
				.catch(err => console.log(err))
		})
	}

	const handleBase = async e => {
		const storageRef = ref(storage, `bases/${cuid()}`)
		e.preventDefault()
		try {
			for (var i = 0; i < data?.images.length; ++i) {
				uploadFile(data.images[i])
				console.log(data.images[i])
			}

			const result = AddBases(
				data.title,
				data.location,
				data.description,
				user.uid,
				urls,
				data.categorie1,
				data.categorie2,
				data.categorie3,
				data.categorie4
			)
			console.log(result)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex flex-col justify-center items-center gap-[32px]'>
			<div className='flex flex-col justify-center items-center gap-[12px]'>
				<Image src='/logo.svg' width='72' height='72' alt='site logo' />
				<h1 className='text-[#59C235] text-[40px] font-inter font-normal leading-[38px]'>
					Tour journey
				</h1>
			</div>

			<h1 className='font-inter font-medium text-[30px] text-[#0F1C2A] leading-[38px]'>
				Регистрация туристического объекта
				{progress}
			</h1>
			<form
				className='flex flex-col justify-center items-start'
				onSubmit={handleBase}>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Название турбазы
				</label>
				<input
					className='rounded-[8px] border-[1px] mb-[16px] border-black min-w-[360px] h-[44px] px-[12px] font-inter placeholder:font-inter placeholder:text-black font-normal text-[16px] leading-[24px] placeholder:leading-[24px]'
					type='text'
					placeholder='Введите название турбазы'
					required
					onChange={e =>
						setData({
							...data,
							title: e.target.value,
						})
					}
					value={data.title}
				/>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Категории
				</label>
				<div className='flex flex-col'>
					<div className='flex flex-row gap-[8px]'>
						<input
							id='first'
							type='checkbox'
							checked={data.categorie1}
							onChange={e =>
								setData({
									...data,
									categorie1: e.target.value,
								})
							}
							name='Рыбалка'
						/>
						<label htmlFor='first'>Рыбалка</label>
					</div>
					<div className='flex flex-row gap-[8px]'>
						<input
							type='checkbox'
							checked={data.categorie2}
							onChange={e =>
								setData({
									...data,
									categorie2: e.target.value,
								})
							}
							name='Сосновый бор'
							id='second'
						/>
						<label htmlFor='second'>Сосновый бор</label>
					</div>
					<div className='flex flex-row gap-[8px]'>
						<input
							type='checkbox'
							checked={data.categorie3}
							onChange={e =>
								setData({
									...data,
									categorie3: e.target.value,
								})
							}
							name='Рядом с рекой'
							id='third'
						/>
						<label htmlFor='third'>Рядом с рекой</label>
					</div>
					<div className='flex flex-row gap-[8px] mb-[12px]'>
						<input
							type='checkbox'
							checked={data.categorie4}
							onChange={e =>
								setData({
									...data,
									categorie4: e.target.value,
								})
							}
							name='Вид на горы'
							id='fourth'
						/>
						<label htmlFor='fourth'>Вид на горы</label>
					</div>
				</div>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Расположение турбазы
				</label>
				<input
					className='rounded-[8px] border-[1px] mb-[16px] border-black min-w-[360px] h-[44px] px-[12px] font-inter placeholder:font-inter placeholder:text-black font-normal text-[16px] leading-[24px] placeholder:leading-[24px]'
					type='text'
					placeholder='Улус, село, адрес'
					required
					onChange={e =>
						setData({
							...data,
							location: e.target.value,
						})
					}
					value={data.location}
				/>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Описание туристического объекта
				</label>
				<input
					className='rounded-[8px] border-[1px] mb-[16px] border-black min-w-[360px] h-[44px] px-[12px] font-inter placeholder:font-inter placeholder:text-black font-normal text-[16px] leading-[24px] placeholder:leading-[24px]'
					type='text'
					placeholder='Опишите туристический объект'
					required
					onChange={e =>
						setData({
							...data,
							description: e.target.value,
						})
					}
					value={data.description}
				/>
				<input
					multiple
					className='mb-[16px]'
					type='file'
					accept='image/*'
					onChange={e =>
						setData({
							...data,
							images: e.target.files,
						})
					}
				/>
				<button
					className='bg-[#59C235] text-white rounded-[8px] min-w-[360px] h-[44px] font-semibold leading-[24px] text-[16px] font-inter'
					type='submit'>
					Зарегистрировать
				</button>
			</form>
		</div>
	)
}

export default AddBase
