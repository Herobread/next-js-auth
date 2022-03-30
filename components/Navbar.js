import Link from 'next/link'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, signout } = useAuth()

    return <div>
        <Link href='/'><a>Home</a></Link>
        <Link href='/login'><a>Login</a></Link>
        <Link href='/signup'><a>Signup</a></Link>
        <Link href='/dashboard'><a>Dashboard</a></Link>
        <Link href='/profile'><a>Profile</a></Link>
        <Link href='/transfer'><a>Transfer</a></Link>

        {user ? `LOGGED IN ASS ${user?.email}` : 'NOT LOGGED IN'}
        {user && <button onClick={signout}>Logout</button>}
    </div>
}
