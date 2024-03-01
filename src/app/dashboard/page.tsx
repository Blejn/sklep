import { ProductCounter } from "@/ui/atoms/ProductCounter/ProductCounter";

export default async function Page() {
	return (
		<div>
			<ProductCounter>
				<Regulamin />
			</ProductCounter>
		</div>
	);
}
