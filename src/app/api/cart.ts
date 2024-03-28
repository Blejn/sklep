import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductsGetByIdDocument
} from "@/gql/graphql";
import { executeGraphql } from "@/utils/api/graphqlApi";


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

export function createCart() {
	return executeGraphql({
		query: CartCreateDocument,
		variables: {
			total: 0,
			email: "sebastian.mazur.p@gmail.com",
			stripeCheckoutId: "1",
		},
		cache:"no-store"
	});
}
export async function addToCart(orderId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: {
			id: productId,
		},
		cache:"no-store"

	});

	if (!product) {
		throw new Error("Product not found");
	}
	//TODO : JESLI PROJEKT JEST W KOSZYKU
	//QUANTITY WCALE NIE MUSI BYC 1

	const graphqlResponse =  executeGraphql({
		query: CartAddProductDocument,
		variables: {
			total: product.price,
			quantity: 1,
			orderId: orderId,
			productId: productId,
		},
		next: {
			tags: ["cart"], 
		},
	});
	revalidateTag("cart");

	return (await graphqlResponse).createOrderItem;
}

