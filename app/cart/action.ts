"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { products, type Product } from "../collection/page";

// Defining the type for Cart objects
export type Cart = {
  userId: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
};

// Function to add an item to the cart
export async function addItem(userId: string, productId: number) {
  // Retrieving the cart based on the user ID
  let cart: Cart | null = await kv.get(`testcart-${userId}`);

  // Finding the selected product from the products array
  const selectedProduct: Product | undefined = products.find(
    (product) => product.id === productId
  );

  // Handling if the selected product is not found
  if (!selectedProduct) {
    console.error(`Product with id ${productId} not found.`);
    return;
  }

  // Creating a new cart object if the cart is empty or doesn't exist
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: userId,
      items: [
        {
          ...selectedProduct,
          quantity: 1,
        },
      ],
    };
  } else {
    // Checking if the item is already in the cart
    let itemFound = false;

    // Updating the quantity of the existing item or adding a new item to the cart
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    }) as Cart["items"];

    if (!itemFound) {
      console.log("Adding new item to the cart.");
      myCart.items.push({
        ...selectedProduct,
        quantity: 1,
      });
    }
  }

  // Logging the updated cart
  console.log("Updated Cart:", myCart);

  // Saving the updated cart to the KV storage
  await kv.set(`testcart-${userId}`, myCart);

  // Triggering revalidation of the '/add-to-cart' page
  revalidatePath("/add-to-cart");
}

// Function to delete an item from the cart
export async function delItem(userId: string, productId: number) {
  // Retrieving the cart based on the user ID
  let cart: Cart | null = await kv.get(`testcart-${userId}`);

  // Checking if the cart and its items exist
  if (cart && cart.items) {
    // Filtering out the item to be deleted from the cart
    const updatedCart = {
      userId: userId,
      items: cart.items.filter((item) => item.id !== productId),
    };

    // Saving the updated cart to the KV storage
    await kv.set(`testcart-${userId}`, updatedCart);

    // Triggering revalidation of the '/add-to-cart' page
    revalidatePath("/add-to-cart");
  }
}

// Function to delete one quantity of an item from the cart
export async function delOneItem(userId: string, productId: number) {
  // Retrieving the cart based on the user ID
  let cart: Cart | null = await kv.get(`testcart-${userId}`);

  // Checking if the cart and its items exist
  if (cart && cart.items) {
    // Updating the quantity of the item or removing it if quantity becomes zero
    const updatedCart = {
      userId: userId,
      items: cart.items
        .map((item) => {
          if (item.id === productId) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              return null;
            }
          }
          return item;
        })
        .filter(Boolean) as Cart["items"],
    };

    // Saving the updated cart to the KV storage
    await kv.set(`testcart-${userId}`, updatedCart);

    // Triggering revalidation of the '/add-to-cart' page
    revalidatePath("/add-to-cart");
  }
}
