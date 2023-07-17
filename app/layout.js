'use client'
import MenuBar from './Components/MenuBar'
import AuthSessionProvider from './Components/SessionProvider'
import { Providers } from './chakraProvider'
import { VStack } from '@chakra-ui/react'


export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <body style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "#a6bdbd",
        backgroundColor: "#adccb3",
        padding: '20px'
      }}>
        <AuthSessionProvider>
          <Providers>
            <VStack width="100%" align='center' justify="center" padding="2" spacing={4} >
              <MenuBar />
              {children}
            </VStack>

          </Providers>
        </AuthSessionProvider>
      </body>

    </html>
  )
}
