import { useState } from 'react'
import Protected from '../components/Protected'
import { useAuth } from '../context/AuthContext'

export default function login() {
    const { signup } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    async function handleSubmit() {
        try {
            await signup({ email: email, password: password, nickname: nickname })
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
        <Protected requiredUserType={null} redirect='/dashboard' />

        <h3>SIGNUP</h3>
        <input placeholder="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <input placeholder="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <input placeholder="text" onChange={(e) => { setNickname(e.target.value) }} value={nickname} />
        <button onClick={handleSubmit} >Signup</button>
    </div>
}
