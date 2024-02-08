import { ProductsList } from "@/ui/organisms/ProductsList";
import { products } from "@/ui/organisms/mocks";

export default function Home() {
	return (
		<section className="mx-auto max-w-screen-2xl p-12 ">
			<ProductsList products={products} />
		</section>
	);
}
