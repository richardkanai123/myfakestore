'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
    Card,
    CardHeader,
    CardFooter,
    Center, Button,
    Flex, Container, Avatar,
    Box, Text, Heading, VStack
} from '@chakra-ui/react'

import { Spinner, useToast } from '@chakra-ui/react'

import { db } from '../libs/Firebase'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const Profile = () => {
    const sessionData = useSession()

    const { data, status } = useSession()

    const [userCredentials, setUserCredentials] = useState({})
    // chakra ui Toast
    const Toast = useToast()

    // Router
    const Router = useRouter()

    const userQuery = query(collection(db, 'users'), where("email", "==", (status === "authenticated" && status != "loading") && data.user.email))
    const [value, loading, error] = useCollection(userQuery)
    const fetchUsers = () => {
        let docData = {}
        if (status == "authenticated") {
            value.docs.map((doc) => {
                docData = { ...doc.data() }
            })

            setUserCredentials(docData)
        }
        else {
            if (value === null && error != null) {
                Toast({
                    title: "Fetch Error",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                })
                Router.push("/")
            }
        }

    }

    useEffect(() => {
        if (!loading) {
            fetchUsers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])


    if (sessionData.status === "loading") {

        return (
            <Container>
                <Center>
                    <Spinner />
                </Center>
            </Container>
        )
    }

    else if (sessionData.status === "unauthenticated") {
        return (
            <Container>
                <VStack justify="center" align="center" gap="20px" w={"full"} p={2}>
                    <Heading> No User Found! </Heading>
                    <Text>You are Not Logged in</Text>
                </VStack>
            </Container>
        )
    }

    return (
        <Container>
            <Center>
                <Card maxW='md' bg="ButtonShadow">
                    <CardHeader>
                        <Flex spacing='4' wrap="wrap">
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={userCredentials.name} src={userCredentials.image} />
                                <Box>
                                    <Heading size='sm'>
                                        {userCredentials.name}
                                    </Heading>
                                    <Text>{userCredentials.email}</Text>
                                </Box>

                                <Button colorScheme="facebook" p="2" onClick={() => signOut()} >
                                    Sign Out
                                </Button>
                            </Flex>
                        </Flex>
                    </CardHeader>

                    <CardFooter>
                        <Center>
                            <Text>Current Session Expires at:{data.expires} </Text>
                        </Center>
                    </CardFooter>
                </Card>
            </Center>
        </Container>
    )
}

export default Profile