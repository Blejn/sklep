import { useGetProduct } from "./useProduct";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { Suspense } from "react";
import { useGetProducts } from "@/app/products/useProducts";
import { Metadata } from "next";
import { ProductDetails } from "@/ui/molecules/product/ProductDetails";
import { getSizeColorVariantsOfProduct } from "@/utils/api/products/getSizeColorVariantsOfProduct";

// export const metadata = {
// 	title: "Product",
// };

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const productResponse = await useGetProduct(params["id"]);
	const product = await productResponse.product;

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
	const { products } = await useGetProducts();
	return products
		.map((product) => ({
			id: product.id,
		}))
		.slice(0, 1);
};
export default async function SingleProductPage({ params }: { params: { id: string } }) {
	const product = await useGetProduct(params["id"]);
	const sizeColorVariants = await getSizeColorVariantsOfProduct(params["id"]);

	return (
		<div>
			{product ? <ProductDetails product={product} sizeColorVariants={sizeColorVariants} /> : <></>}
			<aside>
				<Suspense fallback={"...Ładowanie"}>
					{" "}
					<SuggestedProductsList />
				</Suspense>
			</aside>
			<pre>{JSON.stringify(product)}</pre>
		</div>
	);
}
