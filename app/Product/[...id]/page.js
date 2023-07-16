import DetailedProduct from '@/app/Components/DetailedProduct';
import React from 'react'


// export const metadata = {
//     title: "Product Details",
//     description: "This is the home page",
//     image: "/images/home.png",
//     url: `https://fakestoreapi.com/products/${params.id}`,

// }

// TODO: look into how to create dynamic metadata for products

const Page = async ({ params }) => {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    const data = await res.json()

    return <DetailedProduct Product={data} />
}

export default Page