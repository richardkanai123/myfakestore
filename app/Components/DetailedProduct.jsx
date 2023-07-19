'use client'
import Image from "next/image"
import { Container, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js'
import { AiFillHome } from 'react-icons/ai'
import StarsCount from "./StarsCount"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db } from '../libs/Firebase'

const DetailedProduct = ({ Product }) => {

    // TODO: how to add an item to cart and have it relate to a certain user
    const { id, title, image, description, price, rating } = Product

    const { data, status } = useSession()

    const userQuery = query(collection(db, 'users'), where("email", "==", (status === "authenticated" && status != "loading") && data.user.email))
    const [value, loading, error] = useCollection(userQuery)
    const fetchUsers = () => {
        let docData = {}
        if (status == "authenticated" && !loading) {
            value.docs.map((doc) => {
                docData = doc.id
            })
        }

        return docData
    }

    function AddToCart(ItemID, userData) {
        console.log(ItemID, userData);
    }
    return (
        <Container maxW="container.lg" display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="20px" p="20px" id={id}>
            <Link display="flex" alignContent="center" alignItems="center" alignSelf="flex-start" href='/' colorScheme="facebook" padding="3" rounded="md" variant="outline" fontSize="2xl" fontWeight="bold">
                <AiFillHome /> Back
            </Link>

            <Heading fontSize="xl" color="blueviolet" >{title}</Heading>

            <Flex align="center" direction="column" gap="20px">
                <Flex w='500px' h="lg" align="center" flexDirection="column" justify="center" pos="relative" >
                    <Image src={image}
                        fill
                        objectFit="contain"
                        objectPosition="center"
                        alt="Fakestore Api Image"
                        priority
                    />

                </Flex>

                <Flex as="div" p="10px" justify="center" align="center" direction="column" w={["75%"]}>

                    <Text fontSize="3xl" fontWeight="extrabold" color="blue.400" >{`\uFF04${price}`}</Text>
                    <Text fontSize="xl" fontWeight="semibold" >{description}</Text>
                    <Flex fontSize="md" color="red.400" >
                        <StarsCount numberOfStars={Math.round(rating.rate)} />
                    </Flex>
                </Flex>

                <Button as="button" colorScheme="blue" onClick={AddToCart(id, fetchUsers)} >Add to Cart</Button>
            </Flex>
        </Container>
    )
}

export default DetailedProduct