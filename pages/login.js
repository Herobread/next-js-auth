import { useState, Navigate } from 'react'
import Protected from '../components/Protected'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit() {
        await login({ email: email, password: password })
            .catch((err) => { console.log(err) })
    }

    return <div>
        <Protected requiredUserType={null} redirect={'/dashboard'} />

        <h3>LOGIN( example account: email,password: mine@craft.io )</h3>
        <input placeholder="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <input placeholder="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <button onClick={handleSubmit} >Login</button>
    </div>
}
