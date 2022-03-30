import React from 'react'
import Protected from '../components/Protected'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { user, userData } = useAuth()

    return <div>
        <Protected requiredUserType={'user'} redirect='/dashboard' />

        <h4>DASHBOARD</h4>

        <div>
            Email:{user?.email}
        </div>
        <div>
            Name:{userData?.name}
        </div>
        <div>
            Minecoins:{userData?.minecoins}
        </div>
        <div>
            uid:{user?.uid}
        </div>
    </div>
}
