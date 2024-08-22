import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-50 text-sm justify-between  text-white p-8 flex flex-row">
      <div className="flex flex-col space-y-1.5 ">
        <Link href={"/"}>About Us</Link>
        <Link href={"/"}>Contact Us</Link>
        <Link href={"/"}>Frequently asked questions</Link>
        <Link href={"/"}>support</Link>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Link href={"/"}>Instagram </Link>
        <Link href={"/"}>Facebook </Link>
      </div>
    </div>
  );
};

export default Footer;
