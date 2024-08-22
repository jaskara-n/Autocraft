import React from "react";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";

export type Product = {
  id: number;
  name: string;
  price: number;
};
export const products: Product[] = [
  {
    id: 1,
    name: "Batman print premium T-shirt",
    price: 400,
  },
  {
    id: 2,
    name: "Spiderman print T-shirt",
    price: 700,
  },
  {
    id: 3,
    name: "Loungewear pants men",
    price: 1000,
  },
  { id: 4, name: "Hoodie men", price: 800 },
];
async function page() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const userId = session.user._id;
  //   const cart: Cart | null = await kv.get(`testcart-${userId}`);

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <div className="w-full">
        <h1 className="mb-6 text-xl font-semibold text-left text-slate-900">
          Collection:{" "}
        </h1>

        <div className="flex gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              userId={userId}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>{" "}
    </main>
  );
}

export default page;
