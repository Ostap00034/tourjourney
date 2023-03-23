import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
	const router = useRouter()
	const { user, login, signInWithGoogle } = useAuth()
	const [data, setData] = useState({
		email: '',
		password: '',
	})

	if (user) {
		router.push('/')
	}

	const handleLogin = async e => {
		e.preventDefault()

		console.log(user)
		try {
			await login(data.email, data.password)
			router.push('/dashboard')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex flex-col justify-center w-full h-screen items-center gap-[32px]'>
			<div className='flex flex-col justify-center items-center gap-[12px]'>
				<Image src='/logo.svg' width='72' height='72' alt='site logo' />
				<h1 className='text-[#59C235] text-[40px] font-inter font-normal leading-[38px]'>
					Tour journey
				</h1>
			</div>

			<h1 className='font-inter font-medium text-[30px] text-[#0F1C2A] leading-[38px]'>
				Войдите в свой аккаунт
			</h1>
			<p className='font-inter font-normal text-[16px] leading-[24px]'>
				Добро пожаловать!
			</p>
			<form
				className='flex flex-col justify-center items-start'
				onSubmit={handleLogin}>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Email
				</label>
				<input
					className='rounded-[8px] border-[1px] mb-[16px] border-black min-w-[360px] h-[44px] px-[12px] font-inter placeholder:font-inter placeholder:text-black font-normal text-[16px] leading-[24px] placeholder:leading-[24px]'
					type='email'
					placeholder='Введите email'
					required
					onChange={e =>
						setData({
							...data,
							email: e.target.value,
						})
					}
					value={data.email}
				/>
				<label className='font-inter text-[14px] leading-[20px] font-medium mb-[8px]'>
					Пароль
				</label>
				<input
					className='rounded-[8px] border-[1px] mb-[16px] border-black min-w-[360px] h-[44px] px-[12px] font-inter placeholder:font-inter placeholder:text-black font-normal text-[16px] leading-[24px] placeholder:leading-[24px]'
					type='password'
					placeholder='Введите пароль'
					required
					onChange={e =>
						setData({
							...data,
							password: e.target.value,
						})
					}
					value={data.password}
				/>
				<button
					className='bg-[#59C235] text-white rounded-[8px] min-w-[360px] h-[44px] font-semibold leading-[24px] text-[16px] font-inter'
					type='submit'>
					Войти
				</button>
				<button
					type='button'
					onClick={() => {
						const res = signInWithGoogle()
						console.log(res)
					}}>
					Войти через гугл
				</button>
			</form>
			<Link
				href='/signup'
				className='font-inter font-normal text-[14px] leading-[20px] flex flex-row gap-[4px]'>
				У вас нет аккаунта?
				<h3 className='text-[#5AC235] font-inter font-bold leading-[20px] text-[14px]'>
					Зарегистрироваться
				</h3>
			</Link>
		</div>
	)
}

export default Login
