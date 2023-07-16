'use client'
import Image from "next/image"
import { Center, Container, Heading, Card, CardBody, CardFooter, Stack, Text, Divider, Button, ButtonGroup, CardHeader, Flex, Avatar, Box, IconButton } from "@chakra-ui/react"

import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'





const DetailedProduct = ({ Product }) => {
    const { id, title, image, description, price, rating } = Product
    return (
        <Container maxW="container.lg" display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="20px" p="20px" id={id}>
            <Heading color="blue.500" >Product {id} Details</Heading>

            <Flex align="center" direction="column" gap="20px">
                <Flex w='500px' h="lg" align="center" flexDirection="column" justify="center" pos="relative" >
                    <Image src={image}
                        fill
                        objectFit="contain"
                        objectPosition="center"
                        alt="Fakestore Api Image"
                    />

                </Flex>
                <Heading fontSize="xl" color="blueviolet" >{title}</Heading>
                <Text fontSize="xl" color="blue.400" >{price}</Text>
                <Text fontSize="medium" fontWeight="bold" >{description}</Text>
                <Text fontSize="x-small" color="blue.400" >Rating</Text>

                <Button colorScheme="blue" >Add to Cart</Button>
            </Flex>
        </Container>
    )
}

export default DetailedProduct