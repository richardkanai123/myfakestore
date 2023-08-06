'use client'
import { Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image';
import React from 'react'

const CartTable = ({ items }) => {

    {
        (items === null || items === undefined)
            &&
            <Flex>No Items Found</Flex>
    }

    console.log(items);
    // const { id, itemID, UnitPrice status, itemTitle, Quantity }=items

    async function getItemImageURL(ID) {
        const Product = await fetch(`https://fakestoreapi.com/products/${ID}`)
        const res = await Product.json()
        // const imageUrl = 
        return res.image
    }


    getItemImageURL(2)

    return (
        <VStack color="blue.700" as='div' p="4" w="full" rounded="md" justify="center" align="center" border="none" spacing="4">
            <Flex p="2" w="full" justify="space-around" align="center" alignContent="center" border="0" borderBottom="2px">
                <Heading fontSize="lg" flex="2" >Item</Heading>
                <Heading fontSize="lg" flex="1">Unit Price</Heading>
                <Heading fontSize="lg" flex="1">Quantity</Heading>
                <Heading fontSize="lg" flex="1" >SubTotal</Heading>
                <Heading fontSize="lg" flex="1" >Actions</Heading>
            </Flex>


            {
                (items) && (

                    items.map((item) => (
                        <Flex key={item.id} Flex p="2" w="full" justify="space-around" align="center" alignContent="center" borderBottom="1px">
                            <VStack flex="2">
                                <Image src={(getItemImageURL(item.itemID)).toString()} width={150} height={150} alt={item.itemTitle} priority />
                                <Text fontSize="sm" >{item.itemTitle}</Text>
                            </VStack>
                            <Heading fontSize="lg" flex="1">{item.unitPrice}</Heading>
                            <Heading fontSize="lg" flex="1">{item.quantity}</Heading>
                            <Heading fontSize="lg" flex="1" >
                                {(item.unitPrice) * parseInt(item.quantity)}
                            </Heading>
                            <Heading fontSize="lg" flex="1">Action</Heading>
                        </Flex>

                    ))

                )
            }


        </VStack>
    )
}

export default CartTable