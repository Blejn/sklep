import { Suspense } from "react";
import { type Metadata } from "next";
import { useGetProduct } from "./useProduct";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { UseGetProducts } from "@/app/products/useProducts";
import { ProductDetails } from "@/ui/molecules/product/ProductDetails";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const productResponse = await useGetProduct(params["id"]);
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
export const generateStaticParams = async () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { products } = await UseGetProducts();
	return products
		.map((product) => ({
			id: product.id,
		}))
		.slice(0, 1);
};
export default async function SingleProductPage({ params }: { params: { id: string } }) {
	const product = await useGetProduct(params["id"]);

	return (
		<div>
			{product ? <ProductDetails product={product} /> : <></>}
			<aside>
				<Suspense fallback={"...Ładowanie"}>
					{" "}
					<SuggestedProductsList />
				</Suspense>
			</aside>
		</div>
	);
}
