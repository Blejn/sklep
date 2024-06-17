"use client";
import { useQuery } from "@tanstack/react-query";
import { IncrementProductQuantity } from "../atoms/IncrementProductQuantity";
import { RemoveButton } from "../atoms/RemoveButton";
import { CartTemplate } from "../atoms/CartTemplate";
import { fetchCart } from "@/server/cart";

export function CartModal() {
	const {
		data: cart,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["cart"],
		queryFn: () => fetchCart(),
	});
	if (isLoading) return <div className="h-12 w-12 animate-spin">Loading...</div>;
	if (isError) return <div className="h-12 w-12">...Error</div>;
	if (cart?.orderItems && cart?.orderItems.length < 1) {
		return (
			<div className="absolute inset-0 z-30 bg-slate-700 bg-opacity-75">
				<div className="absoulte flex h-screen w-full items-center ">NO ORDER</div>
			</div>
		);
	}

	return (
		<CartTemplate>
			<ul>
				{cart?.orderItems.map((item) => {
					return (
						<li className="flex flex-row justify-between" key={item.id}>
							{item.product?.name}{" "}
							<IncrementProductQuantity quantity={item.quantity} itemId={item.id} />
							<RemoveButton orderItemId={item.id} />
						</li>
					);
				})}
			</ul>
		</CartTemplate>
	);
}
