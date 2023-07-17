'use client'

import { Text } from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'



const StarsCount = ({ numberOfStars }) => {
    var stars = new Array(numberOfStars)
    return (
        <Text color="goldenrod" fontSize="2xl">
            {stars.map((star) => (
                <AiFillStar key={index} />
            ))}
        </Text>
    )
}


export default StarsCount