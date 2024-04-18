import { revalidateTag } from "next/cache";

import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	ProductsGetByIdDocument,
	RemoveProductFromCartDocument
} from "@/gql/graphql";




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

export async function removeProductFromCart(orderItemId:string){
	const graphqlResponse = executeGraphql({
		query:RemoveProductFromCartDocument,
		variables:{
			id:orderItemId
		},
        next:{
			tags:["product"]
		}

	});



	return (await graphqlResponse).deleteOrderItem;
}

