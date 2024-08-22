"use client";

import { NAV_LINKS } from "@/constants.ts";
import Link from "next/link";
import { Hamburger } from "./hamburger";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// const Sidebar = () => {
//   <div>hello</div>;
// };

const Navbar = () => {
  const { data: session } = useSession();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <main className=" px-4 py-3  flex justify-between  items-center   ">
        <div className="flex flex-row justify-between grow">
          <Link
            style={{ display: isSidebarOpen ? "none" : "block" }}
            className={" text-black    "}
            href="/"
          >
            LOGO
          </Link>
          {session?.user ? (
            <button
              style={{ display: isSidebarOpen ? "none" : "block" }}
              className="px-10"
            >
              <Link href="/cart">My Cart</Link>
            </button>
          ) : (
            <button
              style={{ display: isSidebarOpen ? "none" : "block" }}
              className="px-10"
            >
              <Link href="/login">Sign In</Link>
            </button>
          )}
        </div>
        {/* <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-black flexCenter cursor-pointer p-1.5 px-3 transition-all hover:font-bold hover:bg-black hover:bg-opacity-10 hover:rounded-full"
          >
            {link.label}
          </Link>
        ))}
      </ul> */}
        {/* <div className="text-black mt-2">buttom</div> */}

        <Hamburger onClick={toggleSidebar} isInitiallyOpen={isSidebarOpen} />
        {/* <div
        className={`transition-all  duration-300 flex-col fixed top-0 left-0 w-full  bg-white z-50 
        ${!isSidebarOpen ? "flex" : "hidden"}}`}
      ></div>
      <div className=" flex-col p-36 space-y-6">
        <Link href="/" className="flex text-3xl">
          hello man
        </Link>
        <Link href="/" className="flex text-3xl">
          hello man
        </Link>
        <Link href="/" className="flex text-3xl">
          hello man
        </Link>
      </div>

      {isSidebarOpen && <Sidebar />} */}
      </main>
      {isSidebarOpen && (
        <div>
          {session?.user ? (
            <div className="h-screen flex flex-col space-y-8 p-20 m ">
              <div
                onClick={() => {
                  signOut();
                  closeSidebar();
                  redirect("/");
                }}
                className="text-4xl "
              >
                Sign Out
              </div>
              <Link href="/" className="text-4xl" onClick={closeSidebar}>
                Your Account
              </Link>{" "}
              <Link href="/cart" className="text-4xl" onClick={closeSidebar}>
                Your Cart
              </Link>{" "}
              <Link href="/" className="text-4xl" onClick={closeSidebar}>
                Your Orders
              </Link>
            </div>
          ) : (
            <div className="h-screen flex flex-col space-y-8 p-20 m ">
              <Link className="text-4xl" href="/login" onClick={closeSidebar}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
