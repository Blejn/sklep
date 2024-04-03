import { getCartFromCookies } from "@/app/api/cart";
import { Overlay } from "@/ui/atoms/Overlay";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	if (cart?.orderItems && cart?.orderItems.length < 1) {
		return (
			<div className="absolute inset-0 z-30 bg-slate-700 bg-opacity-75">
				<div className="absoulte flex h-screen w-full items-center ">NO ORDER</div>
			</div>
		);
	}

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<ul>{cart?.orderItems.map((item) => <li key={item.id}>{item.product?.name}</li>)}</ul>
			</div>
		</>
	);
}
