"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { createCart, } from "@/api/cart";
import { executeGraphql } from "@/api/graphqlApi";
import { CartGetByIdDocument, CartSetProductQuantityDocument } from "@/gql/graphql";


export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

export const changeQuantity = async (itemId: string, quantity: number) => {
	const graphqlResponse =  await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			quantity: quantity,
			itemId: itemId,
		},
		next: {
			tags: ["cart"],
		},
	});
	revalidateTag("cart")
  return graphqlResponse.updateOrderItem
	
};

export async function getOrCreateCard() {
	const existingCart = await getCartFromCookies();

	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();

	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 365,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		path: "/",
	});

	return cart.createOrder;
}

