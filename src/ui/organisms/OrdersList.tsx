"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getOrdersByEmail } from "@/server/orders";

export function OrdersList({ email }: { email: string }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["orders"],
		queryFn: () => getOrdersByEmail(email),
	});

	const orders = data?.edges.map((item) => item.node);
	console.log("Orders", orders);
	if (isLoading) return <div className="h-2 w-2 animate-spin">...Loading</div>;
	if (isError) return <div>Sorry we cant get any orders</div>;
	if (!email) {
		return <p>Niestety nie udało się pobrać maila</p>;
	}

	return (
		<div className="flex-direction flex flex-col">
			Hello {email}
			<div className="flex flex-col gap-2">
				{orders?.map((item) => {
					return (
						<div key={item.id} className=" flex flex-row">
							<div className="">{item.id}</div>
							<div className="">
								{item.orderItems.map((orderItem) => {
									return (
										<div key={orderItem.id} className="flex flex-col">
											<div> {orderItem.id}</div>
											<div> {orderItem.quantity}</div>
											<div> {orderItem.total}</div>
											<p className="text-xl"> PRODUCT DETAILS</p>
											<div> {orderItem.product?.id}</div>
											<Image
												height={50}
												width={50}
												src={`${orderItem.product?.images[0]?.url}`}
												objectFit="cover"
												alt={"Image"}
											/>
											<div> {orderItem.product?.name}</div>
											<div> {orderItem.product?.price}</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
