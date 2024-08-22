"use client"; // client component

import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Signin = () => {
  // Using the useSession hook to retrieve the user session information
  const { data: session } = useSession();

  // useEffect hook to reload the page when a user session is detected
  useEffect(() => {
    if (session?.user) {
      window.location.reload();
    }
  }, [session]);

  return (
    <section className="flex items-center justify-center w-full h-screen px-4">
      <form className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5 bg-white rounded text-black">
        <h1 className="w-full my-5 text-2xl font-bold">Welcome back</h1>

        {/* Button to sign in with Google */}
        <button
          className="w-full h-10 justify-center flex py-1.5 px-4 text-sm align-middle items-center rounded text-999 bg-[#F4F4F5] transition duration-150 ease hover:bg-gray-200 gap-3"
          onClick={(e) => {
            e.preventDefault();
            signIn("google"); // Calls the signIn function with "google" provider
          }}
        >
          <svg
            data-testid="geist-icon"
            height="24"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="24"
            style={{ color: "currentColor" }}
          >
            <path
              d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
              fill="#4285F4"
            ></path>
            <path
              d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
              fill="#34A853"
            ></path>
            <path
              d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
              fill="#EA4335"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <Link
          href="/register"
          className="text-sm text-gray-500 transition duration-150 ease hover:text-black"
        >
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
};

export default Signin;
