"use client"; // client component

import { formatNumber } from "@/utils/format";
import { useTransition } from "react";
import { delItem, delOneItem } from "@/app/cart/action";

// Defining the type for props passed to CartItem component
type CartItemProps = {
  no: number;
  id: number;
  userId: string;
  name: string;
  quantity: number;
  price: number;
};

export default function CartItem({
  no,
  id,
  userId,
  name,
  quantity,
  price,
}: CartItemProps) {
  // Declaring state for pending transition
  let [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-between text-slate-900">
      <div className="w-[40%] flex gap-10 items-center">
        <span className="text-sm ">{no}</span>
        <span className="font-extrabold">{name}</span>
      </div>
      <div className="w-[30%] text-start flex flex-row items-center">
        <div>{quantity}</div>x
      </div>
      <div className="w-[30%]  items-center flex flex-row justify-center">
        {formatNumber(quantity * price)}
        <p className="text-xs text-center mt-1 ml-0.5">INR</p>
      </div>
      <button
        style={{ whiteSpace: "nowrap" }}
        className="text-sm text-white  hover:text-red-700 ml-8 px-3 mr-8 bg-gray-30"
        onClick={() => {
          // Initiating a transition to delete all items of this type from the cart
          startTransition(() => delItem(userId, id));
        }}
      >
        Delete all
      </button>
      <button
        style={{ whiteSpace: "nowrap" }}
        className="text-sm text-white hover:text-slate-600 px-2 bg-gray-30"
        onClick={() => {
          // Initiating a transition to delete one item of this type from the cart
          startTransition(() => delOneItem(userId, id));
        }}
      >
        Delete single
      </button>
    </div>
  );
}
