import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const Nav = () => {
	const { user, logout } = useAuth()
	const router = useRouter()

	return (
		<nav className='bg-red-500'>
			<div>
				<Link href='/'>Main</Link>
				{user ? (
					<div>
						<a
							onClick={() => {
								logout()
								router.push('/login')
							}}>
							Logout
						</a>
					</div>
				) : (
					<>
						<Link href='/signup'>Reg</Link>
						<Link href='/login'>Auth</Link>
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
