import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    doc,
    setDoc,
    onSnapshot,
    query,
    where,
    collection,
    getDocs,
    limit,
    runTransaction,
    getDoc
} from 'firebase/firestore';

import { auth, db } from '../lib/firebase'


const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeUserData = () => { }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                })

                unsubscribeUserData = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                    console.log('snapshot')
                    console.log('reading', user.uid)
                    console.log(doc.data())

                    if (doc.data() === undefined) {
                        createUserDocument(user.uid, {
                            minecoins: 100,
                            name: user.uid,
                            isAdmin: false
                        })
                    }
                    setUserData(doc.data())
                })
            } else {
                setUser(null)
                setUserData(null)
            }
            setLoading(false)
        })

        return () => {
            console.log('unsub')
            unsubscribe()
            unsubscribeUserData()
        }
    }, [])

    const signup = async ({ email, password, nickname }) => {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                createUserDocument(res.uid, {
                    minecoins: 100,
                    name: nickname,
                    isAdmin: false
                })
            })
    }

    const login = async ({ email, password }) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const signout = async () => {
        setUser(null)
        setUserData(null)
        await signOut(auth)
    }

    const updateUser = async (uid, data) => {
        return await setDoc(doc(db, 'users', uid), data, { merge: true })
    }

    const createUserDocument = async (uid, data) => {
        return await setDoc(doc(db, 'users', uid), data)
    }

    const getUserUid = async (name) => {
        const q = query(
            collection(db, 'users'),
            where('name', '==', name),
            limit(1)
        )


        const possibleUsers = await getDocs(q)
        console.log()
        if (possibleUsers.docs.length === 0)
            return null

        const recipientUid = possibleUsers.docs[0].id

        return recipientUid
    }

    const getUserData = async ({ name, uid }) => {
        let docRef = ''

        console.log(name, uid)

        if (name) {
            docRef = doc(db, 'users', getUserUid(name))
        } else if (uid) {
            console.log(uid)
            docRef = doc(db, 'users', uid)
        } else {
            return null
        }

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return null
        }
    }

    const transfer = async (sender, recipient, amount) => {
        runTransaction(db, async (transaction) => {
            const senderUid = await getUserUid(sender)
            const recipientUid = await getUserUid(recipient)

            const senderData = await getUserData({ uid: senderUid })
            const recipientData = await getUserData({ uid: recipientUid })

            if (recipientData === null) {
                return Promise.reject("User not found")
            }

            const newSenderData = { minecoins: (parseInt(senderData['minecoins']) - parseInt(amount)) }
            const newRecipientData = { minecoins: (parseInt(recipientData['minecoins']) + parseInt(amount)) }

            transaction.update(doc(db, 'users', senderUid), newSenderData)
            transaction.update(doc(db, 'users', recipientUid), newRecipientData)
        })
    }

    return <AuthContext.Provider value={{
        user,
        userData,
        login,
        signup,
        signout,
        updateUser,
        getUserUid,
        transfer
    }}>
        {loading ? 'Loading' : children}
    </AuthContext.Provider>
}