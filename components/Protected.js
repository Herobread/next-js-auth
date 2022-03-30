import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Protected({ requiredUserType, redirect }) {
    const router = useRouter()

    const { user } = useAuth()

    if (requiredUserType === 'user' && user === null) {
        router.push({
            pathname: `/login`,
            query: { from: redirect }
        })
    } else if (requiredUserType === null && user !== null) {
        router.push({
            pathname: redirect
        })
    }


    return null
}
