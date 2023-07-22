'use client'

import { Button, Center, Container, HStack, Spinner, Text } from "@chakra-ui/react"
import {
    signIn, useSession, signOut
} from 'next-auth/react'

const Login = () => {
    const session = useSession()
    const sesssionStatus = session.status

    if (sesssionStatus === "unauthenticated") {

        return (
            <Container border="none" p="1" w="-moz-fit-content" as="div" display="flex" alignSelf="center" alignItems="center" justifyContent="center"  >
                <Center as="div" display="flex" alignSelf="center" justifyContent="center" alignItems="center" >
                    <Button onClick={() => signIn('google')} size="md" colorScheme="facebook" rounded="md" p='20px'>
                        LogIn With Google
                    </Button>

                </Center>
            </Container>
        )

    }
    else if (sesssionStatus === "loading") {
        return (
            <Container w="container.md" as="div" display="flex" >
                <Center>
                    <HStack>
                        <Spinner />
                        <Text fontSize="x-small">Loading User...</Text>
                    </HStack>
                </Center>
            </Container>
        )
    }

    else

        return (
            <Container w="container.md" as="div" display="flex" >

                <HStack>
                    <Text fontSize="sm">{session.data.user.name}</Text>
                    <Button onClick={() => signOut()} size="md" colorScheme="linkedin" rounded="md" p='20px'>Log Out</Button>
                </HStack>
            </Container>
        )
}




export default Login