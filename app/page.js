import { Suspense } from "react"
import ProductCard from "./Components/ProductCard"



export const metadata = {
  title: "Home",
  description: "This is the home page",
  image: "/images/home.png",
  url: "https://fakestoreapi.com",
  author: "Fakestore API",
}

const Home = async () => {

  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()



  return (
    <div style={{
      display: 'flex',
      gap: "10px",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: "15px 10px"
    }} >

      <h1 style={{
        fontSize: "40px",
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      }} >Featured Products</h1>

      {
        <div style={{
          display: 'flex',
          gap: "20px",
          flexWrap: "wrap",
          alignItems: 'center',
          justifyContent: 'center',
          padding: "5px"
        }} >

          <Suspense fallback={
            <div style={{
              display: 'flex',
              gap: "20px",
              flexWrap: "wrap",
              alignItems: 'center',
              justifyContent: 'center',
              padding: "5px",
              textAlign: "center"
            }} >
              <p style={{
                fontSize: "32px",
                alignItems: 'center',
                justifyContent: 'center',
                padding: "5px",
                textAlign: "center"
              }} >Loading Products.....</p>
            </div>
          }>

            {data.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </Suspense>

        </div>

      }
    </div>
  )
}

export default Home

