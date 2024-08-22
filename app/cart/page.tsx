import ProductCard from "@/components/ProductCard";
import CartItem from "@/components/CartItem";
import { type Cart } from "./action";
import { kv } from "@vercel/kv";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddToCart() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session.user._id;
  const cart: Cart | null = await kv.get(`testcart-${userId}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalprice =
    cart?.items.reduce((sum, item) => sum + item.price, 0) || 0;

  return (
    // start
    <main className="flex flex-col items-center min-h-screen p-24">
      {/* end */}
      <div className="w-full flex flex-col space-y-3 mt-6">
        <h1 className="text-xl font-semibold text-slate-900">Your Cart: </h1>

        <div className="flex flex-col gap-2 space-y-2 py-4 mt-2 ">
          {cart?.items ? (
            cart.items.map((item, index) => (
              <CartItem
                key={item.id}
                no={index + 1}
                id={item.id}
                userId={userId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))
          ) : (
            <span className="text-sm text-slate-600">No Item</span>
          )}
        </div>
      </div>
      <div className="flex bg-gray-10 rounded-xl p-6 justify-between w-full  mt-auto font-semibold text-slate-900">
        <div className="">Total</div>
        <div className="flex flex- space-x-6 row">
          <div className="flex flex-row">
            {total} <p className="text-xs mt-1.5 ml-1">items</p>
          </div>
          <div className="flex flex-row">
            {totalprice}.00 <p className="text-xs mt-1.5 ml-1">INR</p>
          </div>
        </div>
      </div>
    </main>
  );
}
