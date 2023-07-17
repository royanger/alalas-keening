import { FC, JSXElementConstructor, MouseEventHandler, ReactNode } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface DropdownMenuItemWithIconProps {
  // Icon: JSXElementConstructor<{ className: string }>;
  icon: Element
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}


const DropdownMenuItemWithIcon: FC<DropdownMenuItemWithIconProps> = ({ icon, children, onClick }) => {
  return (<DropdownMenuItem onClick={onClick}>
    {/* {icon} */}
    {/* <Icon className="mr-2 h-4 w-4" /> */}
    {children}
  </DropdownMenuItem>);
};


export default DropdownMenuItemWithIcon;
