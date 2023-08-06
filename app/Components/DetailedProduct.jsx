'use client'
import Image from "next/image"
import { Container, Heading, Text, Button, Flex, HStack, VStack } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js'
import { AiFillHome } from 'react-icons/ai'



import AddToCartButton from "./AddToCartButton"
import { useState } from "react"

const DetailedProduct = ({ Product }) => {

    const [Quantity, setQuantity] = useState(1)

    // TODO: how to add an item to cart and have it relate to a certain user
    const { id, title, image, description, price, rating } = Product


    return (
        <Flex w="full" display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="20px" id={id}>
            <Link display="flex" alignContent="center" alignItems="center" alignSelf="flex-start" href='/' colorScheme="facebook" padding="3" rounded="md" variant="outline" fontSize="2xl" fontWeight="bold">
                <AiFillHome /> Back
            </Link>

            <Heading fontSize="xl" fontWeight="bold" color="blue.700" >{title}</Heading>

            <Flex as="div" w="full" align={"center"} justify={['center', "space-between"]} flexDirection={["column", "row", "row"]} gap="20px" >
                <Flex w={["280px", "500px"]} h={["md", "lg"]} align="center" justify="center" pos="relative"  >
                    <Image src={image}
                        fill
                        objectFit="contain"
                        objectPosition="center"
                        alt="Fakestore Api Image"
                        priority
                    />
                </Flex>

                <Flex as="div" p={["5px", "10px"]} justify="center" align="center" direction="column" w={["full", "75%"]}>

                    <Text fontSize={["xl", "3xl"]} fontWeight="extrabold" color="blue.400" >{`\uFF04${price}`}</Text>
                    <Text fontSize={["large", "xl"]} fontWeight="semibold" >{description}</Text>
                    <Text fontSize="md" color="blue.400" >
                        rating:  {rating.rate}
                    </Text>

                    <Flex gap="4" align="center" justify="center" margin="6">
                        <Button disabled={(Quantity === 1)} onClick={() => {
                            if (Quantity > 1) {
                                setQuantity((prev) => prev - 1)
                            }

                        }} colorScheme="facebook" fontSize="2xl" p="2">-</Button>
                        <Text fontSize="3xl" fontWeight="extrabold">{Quantity}</Text>
                        <Button
                            onClick={() => setQuantity((prev) => prev + 1)}
                            colorScheme="facebook" fontSize="2xl" p="2">+</Button>

                    </Flex>
                    <AddToCartButton Quantity={Quantity} Product={Product} />
                </Flex>
            </Flex>
        </ Flex>
    )
}

export default DetailedProduct