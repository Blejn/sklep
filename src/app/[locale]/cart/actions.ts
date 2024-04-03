"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { createCart, getCartFromCookies } from "@/app/api/cart";
import { CartSetProductQuantityDocument, RemoveProductFromCartDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/api/graphqlApi";

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

export async function removeProductFromCart(orderItemId:string){
	const graphqlResponse = executeGraphql({
		query:RemoveProductFromCartDocument,
		variables:{
			id:orderItemId
		},

	});


	return (await graphqlResponse).deleteOrderItem;
}
