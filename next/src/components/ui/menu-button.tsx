'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ClerkLoaded, ClerkLoading, useUser } from '@clerk/nextjs';
import SignedInState from './states/SignedInState';
import SignedOutState from './states/SignedOutState';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'

const MenuButton = () => {

  const { user } = useUser()

  if (!user) return null

  return (
    <div className=''>
      <ClerkLoading>
        <FontAwesomeIcon icon={faSpinner} className='animate-spin h-5 w-5 dark:text-slate-200' />
      </ClerkLoading>
      <ClerkLoaded>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Image src={user.imageUrl} alt={`${user.firstName}'s Profile Image`} width={24} height={24} className="mr-2 rounded-full" />
              {user.firstName}
            </Button>
          </DropdownMenuTrigger>
          <SignedInState />
          <SignedOutState />
        </DropdownMenu>
      </ClerkLoaded>
    </div>
  )
}


export default MenuButton;


