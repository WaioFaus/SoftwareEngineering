import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./mainnav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ShoppingBag } from "lucide-react";
import { UserButton, auth, useAuth } from "@clerk/nextjs";
import { ComboboxDemo } from "./comboboxdemo";
const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className=" bg-[#FFF] flex justify-between items-center py-[10px] border-b shadow-sm w-screen ">
          <div className="flex mx-[100px] justify-between w-full">
            <Logo />
            <div className="flex items-center ">
              <Link href="/home">
                <Button variant="ghost" className="text-md font-medium ">
                  Home
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="ghost" className="text-md font-medium">
                  Contacts
                </Button>
              </Link>
              <Button variant="ghost" className="text-md font-medium">
                About us
              </Button>
              <Link href="/orders">
                <Button variant="ghost" className="text-md font-medium">
                  Orders
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2 h-70  ">
              {/* <Input
                type="text"
                className="px-3 w-80 active:border-none"
                placeholder="Search for items..."
              /> */}
              <ComboboxDemo />
              {/* <Link href="/cart">
                <Button variant="ghost">
                  <ShoppingBag height="100%"></ShoppingBag>
                </Button>
              </Link> */}
              <NavbarActions />

              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
