import { cookies } from "next/headers";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { formatMoney } from "@/utils";
import { getCartFromCookies } from "@/app/api/cart";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/ui/atoms/RemoveButton";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	async function handleStripePaymentAction() {
		"use server";

		if (!process.env.SECRET_KEY) {
			throw TypeError("Stripe is not defined");
		}
		const stripe = new Stripe(process.env.SECRET_KEY, {
			apiVersion: "2023-10-16",
			typescript: true,
		});

		const cart = await getCartFromCookies();
		if (!cart) {
			return;
		}

		const session = await stripe.checkout.sessions.create({
			metadata: {
				cartId: cart.id,
			},
			payment_method_types: ["card"],
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
			success_url: `http://localhost:3000/en/cart/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://localhost:3000/en/cart/canceled`,
		});
		console.log(session.url);
		if (session.url) {
			cookies().set("cartId", "");
			return redirect(session.url);
		}
	}
	return (
		<div className="mt-10">
			<table className="table-fixed">
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<tr key={item.id}>
									<td>{item.product.name}</td>
									<td>
										<IncrementProductQuantity quantity={item.quantity} itemId={item.id} />
									</td>
									<td> {formatMoney(item.product.price)}</td>
									<td>
										<RemoveButton orderItemId={item.id} />
									</td>
								</tr>
							),
					)}
				</tbody>
			</table>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
