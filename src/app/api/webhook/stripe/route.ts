/// <reference types="stripe-event-types" />
import { type NextRequest } from "next/server";
import Stripe from "stripe";



export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.SECRET_KEY) {
		throw TypeError("Stripe is not defined");
	}
	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw TypeError("STRIPE WEBOOK SECRET is not defined");
	}
	const stripe = new Stripe(process.env.SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = request.headers.get('stripe-signature');

	if(!signature){
		return new Response("No signature",{status:401});
	}

	const event = stripe.webhooks.constructEvent(
	await 
	request.text(), 
    signature,	
    process.env.STRIPE_WEBHOOK_SECRET) as Stripe.DiscriminatedEvent;
	console.log(event);

	switch(event.type){
		case "checkout.session.completed":{
			event.data.object.metadata?.cartId;
		}
		case"checkout.session.expired":{
			event.data.previous_attributes
		}
		case"checkout.session.async_payment_failed":{}
		case "checkout.session.async_payment_succeeded":{

		}
	}

	return new Response(null,{status: 204});
}