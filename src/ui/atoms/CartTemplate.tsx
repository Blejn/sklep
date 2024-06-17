import { ReloadButton } from "./ReloadButton";

export function CartTemplate({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-1000 fixed bottom-0 left-0 right-0 top-0 flex justify-end overflow-hidden overscroll-none bg-black bg-opacity-50">
			<ReloadButton />
			<div className="flex h-full w-96 flex-col justify-between bg-slate-100 p-5">
				<h2>Shopping Cart</h2>
				{children}
			</div>
		</div>
	);
}
