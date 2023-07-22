'use client'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, where, addDoc, doc, getDoc, getDocs, Timestamp, serverTimestamp, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db } from '../libs/Firebase'
import { useEffect, useState } from "react";
import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import Login from "./Login"
const AddToCartButton = ({ Product }) => {
    const { id, title, price } = Product
    const { data, status } = useSession()
    const [currentUserDetails, setCurrentUserDetails] = useState()

    // Toast
    const popToast = useToast()


    // gets data about the currently logged in user
    const fetchLoggedUSerID = async () => {
        const userQuery = query(collection(db, 'users'), where("email", "==", data.user.email))
        if (status === "authenticated" && status != "loading") {
            const userDoc = await getDocs(userQuery)
            const CurrentUserData = userDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCurrentUserDetails(CurrentUserData)
        }
    }

    useEffect(() => {
        if (status === "authenticated") {

            fetchLoggedUSerID()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    // adds a new collection of cartItems to a user
    const AddItemToCart = async () => {
        if (data !== null && status === "authenticated") {
            let userID = (currentUserDetails !== undefined && currentUserDetails[0].id)
            const userCartCollectionRef = doc(db, "users", userID)
            const CartRef = doc(collection(userCartCollectionRef, "cart"))

            const newCartItem = {
                itemID: id,
                itemTitle: title,
                unitPrice: price,
                timeAdded: serverTimestamp(),
                status: "in-cart"
            }

            try {
                popToast(
                    {
                        title: "Adding to Cart",
                        description: `Adding ${title} to cart`,
                        status: "loading",
                        duration: 3000,
                        isClosable: false,
                        position: "top-left"
                    }
                )
                await setDoc(CartRef, newCartItem).then(() => {
                    popToast.closeAll()
                }).finally(() => {
                    popToast({
                        title: "Added to Cart",
                        description: "Added new Item to Cart",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                    })
                })

            } catch (error) {
                popToast.closeAll()
                popToast({
                    title: "Error Occured",
                    description: `${error.message}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
            }

        }

    }

    if (status === "loading") {
        return (
            <Button as="button" display="flex" justifyContent="center" size="md" rounded="lg" shadow="dark-lg">
                <Spinner />
                <Text>Checking User</Text>
            </Button>
        )
    }
    else

        if (status === "unauthenticated") {
            return (
                <>
                    <Text>Log in To Add to Cart</Text>
                </>
            )
        }


    return (
        <Button onClick={AddItemToCart} colorScheme="facebook">Add To Cart</Button>
    )
}

export default AddToCartButton