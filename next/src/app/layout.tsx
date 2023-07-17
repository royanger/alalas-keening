import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Alala's Keening",
  description: "A player resource and OBS screen for the Alala's Keening TTRPG campaign.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        </head>
        <body className={inter.className}>

          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}

