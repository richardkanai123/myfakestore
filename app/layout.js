'use client'
import MenuBar from './Components/MenuBar'
import { Providers } from './Components/chakraProvider'
import { Container, VStack } from '@chakra-ui/react'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#a6bdbd",
        padding: '20px'
      }}>
        <Providers>
          <VStack width="100%" align='center' padding="2" spacing={4} >
            <MenuBar />
            {children}
          </VStack>

        </Providers>
      </body>
    </html>
  )
}
