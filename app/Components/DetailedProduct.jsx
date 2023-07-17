'use client'
import Image from "next/image"
import { Container, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js'
import { AiFillHome } from 'react-icons/ai'
import StarsCount from "./StarsCount"


const DetailedProduct = ({ Product }) => {
    const { id, title, image, description, price, rating } = Product
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

                <Button colorScheme="blue" >Add to Cart</Button>
            </Flex>
        </Container>
    )
}

export default DetailedProduct