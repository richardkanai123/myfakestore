'use client'
import {
    Button, Container,
    Flex, Input, useToast,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react'
import { useState } from "react"
import { db } from "../libs/Firebase"
import { collection, doc, setDoc } from "firebase/firestore"

const Page = () => {

    const [SenderEmail, setSenderEmail] = useState("")
    const [Message, setMessage] = useState('')

    const Toast = useToast()

    // validate email
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleSendMessage = async () => {

        // chck that none is null...
        if (SenderEmail === "" || Message === "") {
            Toast({
                title: "submission error",
                status: "error",
                description: "Fill in all the required inputs",
                position: "top"
            })
            return false;
        }
        else if (isValidEmail(SenderEmail) === false) {
            Toast({
                title: "submission error",
                status: "error",
                description: "Check the email address entered",
                position: "top"
            })
            return false
        }
        else {

            Toast({
                title: "Sending Message....",
                description: "Sending Your Message",
                status: "loading",
                variant: "top-accent",
                position: "top",
                duration: 2000,
                isClosable: false

            })
            // console.log(SenderEmail, Message);
            const messageContent = {
                SenderEmail,
                Message
            }

            const messagesCollectionRef = collection(db, "messages")
            const newMessageDocRef = doc(messagesCollectionRef)

            try {
                await setDoc(newMessageDocRef, messageContent)
                    .then(() => {
                        Toast.closeAll()
                    })
                    .finally(() => {
                        Toast({
                            title: "Message Sent",
                            status: "success",
                            variant: "solid",
                            position: "top",
                            duration: 3000,
                            isClosable: true
                        })

                        setSenderEmail("")
                        setMessage("")
                    })
            } catch (error) {
                Toast.closeAll()
                Toast({
                    title: "Error!",
                    description: `${error.message}`,
                    status: "error",
                    variant: "solid",
                    position: "top",
                    duration: 3000,
                    isClosable: true
                })

            }
        }

    }

    return (
        <Container p="10" display="flex" justifyItems="center" justifySelf="center" alignContent="center" alignSelf="center">
            <Flex color="blue.700" as="div" w={["full", "container.sm", "container.md"]} padding="20px" direction="column" gap="15px">
                <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="xl">Email address</FormLabel>
                    <Input value={SenderEmail} onChange={(e) => setSenderEmail(e.target.value)} shadow="md" fontWeight="semibold" type='email' size="lg" placeholder="example: abd@acb.com " />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="xl">Message</FormLabel>
                    <Textarea value={Message} onChange={(e) => setMessage(e.target.value)} shadow="md" fontWeight="semibold" size="lg" placeholder="Enter Message Here" />
                </FormControl>
                <Button
                    onClick={handleSendMessage}
                    type="button" colorScheme="telegram" size="md" >Send Message</Button>

            </Flex>
        </Container>
    )
}

export default Page