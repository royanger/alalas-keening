import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { SignOutButton, SignedIn, useClerk } from "@clerk/nextjs";
import MultiAccountState from "./MultiAccountState";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignedInState = () => {
  const { session, openUserProfile } = useClerk();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return <SignedIn>
    <DropdownMenuContent className="px-2 ">
      <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => openUserProfile({ appearance: { baseTheme: isDark ? dark : undefined } })}>
          <FontAwesomeIcon icon={faUser} className="mx-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <SignOutButton signOutOptions={{ sessionId: session?.id }}>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-2" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </SignOutButton>
        <MultiAccountState />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </SignedIn>;
}

export default SignedInState;
