'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import Login from '../Components/Login'
import { Center, Spinner, Container, Text, VStack, Heading } from '@chakra-ui/react'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../libs/Firebase'
import CartTable from '../Components/CartTable'


const Cart = () => {
    const { data, status } = useSession()
    const [cartData, setCartData] = useState()
    const [currentUserDetails, setCurrentUserDetails] = useState([])
    const [cartDataError, setcartDataError] = useState()
    // gets userData from firebase
    const fetchLoggedUSerID = async () => {
        try {
            const GottenSession = await getSession()
                .then(async (data) => {
                    console.log(data);
                    const userQuery = query(collection(db, 'users'), where("email", "==", data.user.email))
                    const userDoc = await getDocs(userQuery)
                    const CurrentUserData = userDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    setCurrentUserDetails(CurrentUserData)
                })
                .then(() => {
                    console.log(currentUserDetails[0].id);
                    getUserItemsGivenID(currentUserDetails[0].id)
                })

        } catch (error) {
            setcartDataError(error);
        }

    }

    const getUserItemsGivenID = async (id) => {
        const userCartCollectionRef = doc(db, "users", id)
        const CartRef = collection(userCartCollectionRef, "cart")
        const CartQuery = query(CartRef, orderBy("timeAdded", "desc"))
        await getDocs(CartQuery)
            .then((cartDoc) => {
                setCartData(cartDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })

    }



    useEffect(() => {
        console.log("renderded");
        fetchLoggedUSerID()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])



    if (status === "loading") {
        return (
            <Center>
                <VStack>
                    <Text>Loading User .....</Text>
                </VStack>
            </Center>

        )
    }

    if (status === "unauthenticated") {
        return (
            <VStack>
                <Heading>Log in To see Cart</Heading>
                <Login />
            </VStack>
        )
    }


    return (
        <VStack as="div" border="none" w='full'>
            <Text fontWeight="bold">
                {data.user.name} Cart
            </Text>

            <CartTable items={cartData} />

        </VStack>
    )


}

export default Cart