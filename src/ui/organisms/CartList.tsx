"use client";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CartFormPayment } from "./CartFormPayment";
import { formatMoney } from "@/utils";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/ui/atoms/RemoveButton";
import { fetchCart } from "@/server/cart";

export function CartList() {
	const { data: cart, isError } = useQuery({
		queryKey: ["cart"],
		queryFn: () => fetchCart(),
	});
	if (!cart) {
		redirect("/");
	}
	if (isError) {
		return <div>Error...</div>;
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
			<CartFormPayment />
		</div>
	);
}
