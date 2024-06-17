"use server"


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

import { revalidateTag } from "next/cache";

import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument, CartSetProductQuantityDocument,
	ProductsGetByIdDocument,
	PublishLineItemByIdDocument,
	PublishOrderByIdDocument,
	RemoveProductFromCartDocument,
	type PublishLineItemByIdMutation,
} from "@/gql/graphql";
import { environment } from "@/lib/environment";


const {HYGRAPH_MUTATION_TOKEN}  = environment


export async function fetchCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			next:{tags:['cart']},
			cache:"force-cache"
		});
		if (cart.order) {
			return cart.order;

		}

	}

}
export async function fetchCartById(cartId:string) {
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			next:{tags:['cart']},
			cache:"force-cache"
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

export const changeQuantityMutation = async (itemId: string, quantity: number) => {
	const graphqlResponse =  await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			quantity: quantity,
			itemId: itemId,
		},
	});
	revalidateTag("cart")
  return graphqlResponse.updateOrderItem
	
};

export async function getOrCreateCard() {
	const existingCart = await fetchCart();

	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();
	

	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}
    await publishOrder(cart.createOrder.id);
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

	const graphqlResponse =await executeGraphql({
		query:RemoveProductFromCartDocument,
		variables:{
			id:orderItemId
		},
		headers:{
			Authorization:`${environment.HYGRAPH_MUTATION_TOKEN}`
		}

	});

	revalidateTag("cart")

	return graphqlResponse.deleteOrderItem;
}


export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			next:{tags:["cart"]},
			cache:"force-cache"
		});
		if (cart.order) {
			return cart.order;
		}
	}
}


export type Cart = {
	id: string;
    orderItems: {
        id: string;
        quantity: number;
        product?: {
            id: string;
            price: number;
            name: string;
            description: string;
            categories: {
                name: string;
                slug: string;
            }[];
            images: {
                url: string;
            }[];
        } | null | undefined;
    }[];
} | undefined

export const handleStripePaymentAction= async()=> {
	"use server";

	console.log('DUPAQAAAAAAAA' )
	if (!process.env.SECRET_KEY) {
		throw TypeError("Stripe is not defined");
	}

	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return;
	}

	const cart = await  fetchCartById(cartId);
	if (!cart) {
		return;
	}

	const stripe = new Stripe(process.env.SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart?.orderItems.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});
	if (session.url) {
		cookies().set("cartId", "");
		return redirect(session.url);
	}
}



export  async function createCart() {
	return  executeGraphql({
		query: CartCreateDocument,
		variables: {
			total: 0,
			email: "sebastian.mazur.p@gmail.com",
			stripeCheckoutId: "1",
		},
		next:{tags:["cart"]},
		cache:"force-cache",
		headers:{
			'Authorization':`Bearer ${HYGRAPH_MUTATION_TOKEN}`
		}
		// cache:"no-store"
	});

}

export async function publishOrder(id:string){
return executeGraphql({
	query:PublishOrderByIdDocument,
	variables:{
		orderId:id
	},

	headers:{
		'Authorization':`Bearer ${HYGRAPH_MUTATION_TOKEN}`
	}
	
})
revalidateTag("orders");
}

export async function publishOrderLineItem(id:string):Promise<PublishLineItemByIdMutation['publishOrderItem']>{
 // eslint-disable-next-line @typescript-eslint/no-floating-promises

	const graphqlResponse = await executeGraphql({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		query:PublishLineItemByIdDocument,
		variables:{
			orderLineItemId:id
		},
		headers:{
			'Authorization':`Bearer ${HYGRAPH_MUTATION_TOKEN}`

		}
	})
	if(!graphqlResponse){
		throw new Error("Can't publish orderLineItem");
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return graphqlResponse.publishOrderItem

}
export async function addToCart(orderId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: {
			id: productId,
		},
	});

	if (!product) {
		throw new Error("Product not found");
	}
	//TODO : JESLI PROJEKT JEST W KOSZYKU
	//QUANTITY WCALE NIE MUSI BYC 1

	const graphqlResponse =  await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			total: product.price,
			quantity: 1,
			orderId: orderId,
			productId: productId,
		},
		headers:{
			Authorization:`${environment.HYGRAPH_MUTATION_TOKEN}`
		}
	});

	if(graphqlResponse.createOrderItem){
	
	await publishOrderLineItem(graphqlResponse.createOrderItem?.id);
	revalidateTag("cart");
	return graphqlResponse.createOrderItem;

	}

	
	
}

