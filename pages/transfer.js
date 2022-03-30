import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import Protected from '../components/Protected'

export default function transfer() {
    const { userData, transfer } = useAuth()

    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState(0)

    async function handleSubmit() {
        const isSameName = userData.name === recipient
        const isValidAmount = (amount >= 1 && amount <= 1000000)

        if (!isSameName && isValidAmount) {
            const res = await transfer(userData.name, recipient, amount)
            console.log(res)
        } else {
            if (isSameName)
                alert('invalid name entered')
            if (!isValidAmount)
                alert(isValidAmount || 'invalid amount entered')
        }
    }

    return <>
        <Protected requiredUserType={'user'} redirect='/transfer' />

        <h4>TRANSFER</h4>
        <p>You have {userData?.minecoins} Mc</p>
        <input placeholder='recipient' onChange={(e) => { setRecipient(e.target.value) }} value={recipient} />
        <input placeholder='amount' type='number' onChange={(e) => { setAmount(e.target.value) }} value={amount} />
        <button onClick={handleSubmit}>Send</button>
    </>
}
