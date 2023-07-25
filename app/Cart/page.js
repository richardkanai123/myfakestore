'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Login from '../Components/Login'
import { Center, Spinner, Container, Text, VStack, Heading } from '@chakra-ui/react'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../libs/Firebase'
import CartTable from '../Components/CartTable'


const Cart = () => {
    const { data, status } = useSession()
    const [cartData, setCartData] = useState({})
    const [currentUserDetails, setCurrentUserDetails] = useState([])


    // gets userData from firebase
    const fetchLoggedUSerID = async () => {
        if (status === "authenticated" && status != "loading") {
            const userQuery = query(collection(db, 'users'), where("email", "==", data.user.email))
            const userDoc = await getDocs(userQuery)
            const CurrentUserData = userDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCurrentUserDetails(CurrentUserData)
        }


        if (currentUserDetails.length > 0) {

            const userCartCollectionRef = doc(db, "users", currentUserDetails[0].id)
            const CartRef = collection(userCartCollectionRef, "cart")
            const CartQuery = query(CartRef, orderBy("timeAdded", "desc"))
            const CartItemsDoc = await getDocs(CartQuery)
            const cartItems = CartItemsDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCartData(cartItems)
            console.log(cartItems);
        }
    }


    useEffect(() => {
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
            <Login />
        )
    }







    return (
        <Container border="none">
            <VStack as="div" border="none">
                <Heading border="none">
                    {data.user.name} Cart
                </Heading>
                <CartTable />
            </VStack>
        </Container>
    )
}

export default Cart