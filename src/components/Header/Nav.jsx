import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const Nav = () => {
	const { user, logout } = useAuth()
	const router = useRouter()

	return (
		<nav className=''>
			<div className='flex flex-row justify-around px-10 py-5'>
				<h onClick={() => router.push('/')} className='cursor-pointer'>
					Главная
				</h>
				{user ? (
					<div className='flex flex-row gap-[12px]'>
						<a
							className='cursor-pointer'
							onClick={() => {
								logout()
								router.push('/login')
							}}>
							Выйти
						</a>
						<h onClick={() => router.push('/bases')} className='cursor-pointer'>
							Турбазы
						</h>
						<h
							onClick={() => router.push('/addBase')}
							className='cursor-pointer'>
							Добавление турбазы
						</h>
					</div>
				) : (
					<>
						<h
							onClick={() => router.push('/signup')}
							className='cursor-pointer'>
							Регистрация
						</h>
						<h onClick={() => router.push('/login')} className='cursor-pointer'>
							Авторизация
						</h>
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
