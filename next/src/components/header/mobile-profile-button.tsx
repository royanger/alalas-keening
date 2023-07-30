'use client'

import { useClerk, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { dark } from "@clerk/themes";
import Image from 'next/image'

export const MobileProfileButton = () => {
  const { openUserProfile } = useClerk()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark';

  const { user } = useUser()

  if (!user) return null

  const handleOpenProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    // this doesn't stop Profile from closing itself and menu
    // e.stopPropagation();

    openUserProfile(
      {
        appearance: {
          baseTheme: isDark ? dark : undefined,
          elements: {
            modalContent: {
              pointerEvents: "initial",
            }
          }
        }
      })
  }

  return (
    <Button onClick={(e) => handleOpenProfile(e)}>
      <Image src={user.imageUrl} alt={`${user.firstName}'s Profile Image`} width={24} height={24} className="mr-2 rounded-full" />
      {user.firstName}
    </Button>

  )
}
