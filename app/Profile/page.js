'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Center, Button,
    Flex, Container, Avatar,
    Box, Text, Heading, IconButton, Image
} from '@chakra-ui/react'

import { Spinner } from '@chakra-ui/react'
import Login from '../Components/Login'

import { db } from '../libs/Firebase'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, where } from 'firebase/firestore'

const Profile = () => {
    const sessionData = useSession()
    // console.log(sessionData);
    const { user } = useSession()
    console.log(user);

    // const userQuery = query(collection(db, 'users'), where("email" === sessionData?.data.user.email))
    // const [sessionAccount, loading, error] = useCollection(userQuery)

    // console.log(sessionAccount);

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
                <Center>
                    <Login />
                </Center>
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
                                <Avatar name={(sessionData.status !== "loading" || sessionData.status !== "unauthenticated") && sessionData.data?.user.name} src={sessionData.status !== "loading" && sessionData.data.user.image} />
                                <Box>
                                    <Heading size='sm'>
                                        {sessionData.status !== "loading" && sessionData.data.user.name}
                                    </Heading>
                                    <Text>{sessionData.status !== "loading" && sessionData.data.user.email}</Text>
                                </Box>

                                <Button colorScheme="facebook" p="2" onClick={() => signOut()} >
                                    Sign Out
                                </Button>
                            </Flex>
                        </Flex>
                    </CardHeader>

                    <CardFooter>
                        <Center>
                            <Text>Current Session Expires at: </Text>
                        </Center>
                    </CardFooter>
                </Card>
            </Center>
        </Container>
    )
}

export default Profile