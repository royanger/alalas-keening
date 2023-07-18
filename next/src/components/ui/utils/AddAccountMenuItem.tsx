import { SignInButton } from "@clerk/nextjs";
import DropdownMenuItemWithIcon from "./DropdownMenuItemWithIcon";

const AddAccountMenuItem = () => {
  return <SignInButton>
    {/* <DropdownMenuItemWithIcon Icon={Plus}> */}
    <span>Add Account</span>
    {/* </DropdownMenuItemWithIcon> */}
  </SignInButton>;
}

export { AddAccountMenuItem }
