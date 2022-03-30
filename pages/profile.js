import { useState } from "react"
import Protected from "../components/Protected"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
    const { user, userData, updateUser } = useAuth()

    let name = userData?.name || ''
    const [newName, setNewName] = useState(name)

    async function handleSubmit() {
        await updateUser(user.uid, { name: newName })
    }

    return <>
        <Protected requiredUserType={'user'} redirect={'/profile'} />
        <h4>EDIT PROFILE</h4>
        <p>{userData?.name}, {userData?.minecoins} Mc</p>
        <input placeholder="nickname" onChange={(e) => { setNewName(e.target.value) }} value={newName} />
        <button onClick={handleSubmit}>Save</button>
    </>
}
