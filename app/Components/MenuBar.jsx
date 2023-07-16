'use client'
import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Box,
    Text
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'
import { FaShoppingCart, FaUserCircle, FaHome } from 'react-icons/fa'
import { BiSolidContact } from "react-icons/bi"
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

const MenuBar = () => {
    return (
        <Box zIndex="sticky" width='100%' display="flex" alignItems="center" borderBottom="2px" justifyContent="space-around" gap='4' paddingBottom="2" borderColor="white" mb="2">

            <Box>
                <Link as={NextLink} fontSize="2xl" color="whiteAlpha.900" href="/" fontWeight="bold" >fakeStore</Link>
            </Box>

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Menu'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />



                <MenuList as="div" fontSize="large">

                    <MenuItem as="a" href='/' icon={<FaHome />} >
                        Home
                    </MenuItem>
                    <MenuItem as="a" href="/Cart" icon={<FaShoppingCart />} >
                        Cart
                    </MenuItem>
                    <MenuItem as="a" href="/Contact" icon={<BiSolidContact />} >
                        Contact
                    </MenuItem>
                    <MenuItem as="a" href='/Profile' icon={<FaUserCircle />} >
                        Profile
                    </MenuItem>
                </MenuList>
            </Menu>


        </Box>
    )
}

export default MenuBar