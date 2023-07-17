'use client'

import { useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export const SignInButton = () => {

  const clerk = useClerk()

  return (

    <Button onClick={() => clerk.openSignIn()}>asdfasfsd</Button>
  )
}
