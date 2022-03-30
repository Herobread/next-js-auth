import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Protected({ requiredUserType, redirect }) {
    const router = useRouter()

    const { user, userData } = useAuth()

    if (requiredUserType === 'user' && user === null) {
        router.push({
            pathname: `/login`,
            query: { from: redirect }
        })
    } else if (requiredUserType === 'admin' && userData?.isAdmin !== true) {
        router.push({
            pathname: redirect
        })
    } else if (requiredUserType === null && user !== null) {
        router.push({
            pathname: redirect
        })
    }


    return null
}
