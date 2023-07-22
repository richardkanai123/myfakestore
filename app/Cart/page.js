'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Login from '../Components/Login'
import { Center, Spinner, Container, Text, VStack, Heading } from '@chakra-ui/react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../libs/Firebase'


const Cart = () => {
    const { data, status } = useSession()
    const [cartData, setCartData] = useState({})
    const [currentUserDetails, setCurrentUserDetails] = useState()


    useEffect(() => {
        if (status === "authenticated") {

            fetchLoggedUSerID()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    useEffect(() => {
        if (status === "authenticated" && (status !== "laoding" || status === "unauthenticated")) {
            let userID = (currentUserDetails !== undefined && currentUserDetails[0].id)
            const userCartCollectionRef = doc(db, "users", userID)
            // const CartCollectionRef = userCartCollectionRef.collection("cart")
            console.log(userCartCollectionRef);
        }
    }, [currentUserDetails, status])


    if (status === "loading") {
        return (
            <Center>
                <VStack>
                    <Spinner />
                    <Text>Loading .....</Text>
                </VStack>
            </Center>

        )
    }

    if (status === "unauthenticated") {
        return (
            <Login />
        )
    }

    // gets userData from firebase
    const fetchLoggedUSerID = async () => {
        const userQuery = query(collection(db, 'users'), where("email", "==", data.user.email))
        if (status === "authenticated" && status != "loading") {
            const userDoc = await getDocs(userQuery)
            const CurrentUserData = userDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCurrentUserDetails(CurrentUserData)
        }
    }

    return (
        <Container border="none">
            <VStack border="none">
                <Heading border="none">
                    {data.user.name} Cart
                </Heading>
                <Text>
                    cart Items go here
                </Text>
            </VStack>
        </Container>
    )
}

export default Cart