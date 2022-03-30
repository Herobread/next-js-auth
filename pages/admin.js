import { useState } from "react/cjs/react.development";
import Protected from "../components/Protected";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
    const { userData, user, updateUser, getUserUid } = useAuth()

    const [name, setName] = useState('')
    const [data, setData] = useState(`{
        "minecoins": 100,
        "isAdmin": false
    }`)

    async function handleSubmit() {
        const editedUserUid = await getUserUid(name)
        await updateUser(editedUserUid, JSON.parse(data))
    }

    return <>
        <Protected requiredUserType={'admin'} redirect='/dashboard' />

        <input onChange={(e) => { setName(e.target.value) }} value={name} placeholder='name' />
        <textarea onChange={(e) => { setData(e.target.value) }} value={data} placeholder='data' />
        <button onClick={handleSubmit}>Update userdata</button>
    </>
}
