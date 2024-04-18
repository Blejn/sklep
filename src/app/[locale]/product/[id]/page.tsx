import { Suspense } from "react";
import { type Metadata } from "next";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { ProductDetails } from "@/ui/molecules/product/ProductDetails";
import { getProductById } from "@/api/products/getProductById";

export const generateMetadata = async ({
	params: { id },
}: {
	params: { id: string };
}): Promise<Metadata> => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const productResponse = await getProductById({ id: id });
	const product = productResponse.product;

	return {
		title: `Produkt ${product?.name}`,
		description: "Opis produktu",
		openGraph: {
			title: `Produkt ${product?.name}`,
			description: `Opis produktu $${product?.description}`,
			images: product?.images[0]?.url,
		},
	};
};

export default async function SingleProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await getProductById({ id: id });
	return (
		<div>
			<ProductDetails product={product} />
			<aside>
				<Suspense fallback={"...Ładowanie"}>
					{" "}
					<SuggestedProductsList />
				</Suspense>
			</aside>
		</div>
	);
}
