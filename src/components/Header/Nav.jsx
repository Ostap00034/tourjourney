import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const Nav = () => {
	const { user, logout } = useAuth()
	const router = useRouter()

	return (
		<nav className='bg-red-500'>
			<div className='flex flex-row justify-around px-10 py-5'>
				<Link href='/'>Главная</Link>
				{user ? (
					<div>
						<a
							className='cursor-pointer'
							onClick={() => {
								logout()
								router.push('/login')
							}}>
							Выйти
						</a>
					</div>
				) : (
					<>
						<Link href='/signup'>Регистрация</Link>
						<Link href='/login'>Авторизация</Link>
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
