import { handleStripePaymentAction } from "@/server/cart";

export function CartFormPayment() {
	return (
		<form action={handleStripePaymentAction} className="ml-auto">
			<button
				type="submit"
				className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
			>
				Pay
			</button>
		</form>
	);
}
