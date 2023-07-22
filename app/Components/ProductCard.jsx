'use client'
import { Card, Image, CardBody, CardFooter, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'


const ProductCard = ({ product }) => {
    const { id, title, price, image } = product

    return (
        <Card as="a" maxW='sm' minW='320px' href={`/Product/${id}`} colorScheme='green' bg="chakra-subtle-bg._dark"  >
            <CardBody display="flex" flexDir="column" alignContent="center" alignItems="center">
                <Image
                    src={image}
                    alt={title}
                    borderRadius=''
                    boxSize="60"
                    objectFit="contain"
                    objectPosition="center"
                />
                <Divider />
                <Stack w="full" mt='4' h="150px">
                    <Heading size='md' color="blue.500" textAlign="left" mb="2">{title}</Heading>

                    <Heading color='blue.600' fontWeight="extrabold" fontSize='3xl' display="flex">
                        <Text fontSize="sm" >$</Text>
                        {price}
                    </Heading>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default ProductCard