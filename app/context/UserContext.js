'use -client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const userContext = createContext()

export const UserContextProvider = ({ children }) => {

    const { data, status } = useSession()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (status === "loading") {
            setUserInfo(status)
        }
        else if (status === "unauthenticated") {
            setUserInfo(null)
            return false
        }
        else if (status === "authenticated") {
            setUserInfo(data.user)
        }
    }, [data, status])


    return (
        <userContext.Provider value={[data, status]}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}