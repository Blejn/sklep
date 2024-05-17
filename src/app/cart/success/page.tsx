import { redirect } from "next/navigation";
import React from "react";
import Stripe from "stripe";

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!searchParams.session_id) {
		return redirect("/");
	}

	if (!process.env.SECRET_KEY) {
		throw TypeError("Stripe is not defined");
	}
	const stripe = new Stripe(process.env.SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
	return <h2>{session.payment_status}</h2>;
}
