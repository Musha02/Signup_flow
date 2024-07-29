"use client";

import Image from "next/image";
import { useState } from "react";
import Mylogo from "@/components/images/Mylogo.png";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
//import { useUser } from "@auth0/nextjs-auth0/client";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};




export default function Navbar() {
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  //const { user } = useUser();

  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <div className="mx-auto flex  w-full max-w-7xl text-xl justify-between px-4 py-5 text-sm">
    {/* left side  */}
    <section ref={animationParent} className="flex items-center gap-10">
      {/* logo */}
      <Link href= "/"><Image src={Mylogo} alt=" logo" className="w-28 h-14" /></Link>
      {isSideMenuOpen}
      
      {/* navitems */}
    </section>

    {/* right side data */}
    <section className="hidden md:flex items-center gap-8">
        {/*{user ? (
          <>
            <span>{`Hi ${user.nickname}!`}</span>
            <Link href="/api/auth/logout" className="h-fit rounded-xl text-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
              Logout
            </Link>
          </>
        ) : (
          <Link href="/api/auth/login" className="h-fit rounded-xl text-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Login
          </Link>
        )}*/}
        <Link href="/signup" className="h-fit rounded-xl text-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Signup
          </Link>
      </section>

    <FiMenu
      onClick={openSideMenu}
      className="cursor-pointer text-4xl md:hidden"
    />
  </div>
)
}


