import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Signin from "@/components/Signin";

const Login = async () => {
  // Fetches the user's session information from the server
  const session: Session | null = await getServerSession(authOptions);

  // Redirects the user to the add-to-cart page if already logged in, otherwise displays the Signin component
  if (session) {
    redirect("/collection");
  } else {
    return <Signin />;
  }
};

export default Login;
