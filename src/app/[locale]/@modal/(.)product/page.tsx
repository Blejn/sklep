import { type Metadata } from "next";
import { useGetProduct } from "../../product/[id]/useProduct";
import { UseGetProducts } from "../../products/useProducts";
import Image from "./opengraph-image";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const productResponse = await useGetProduct(params["id"]);
	const product = productResponse.product;
	return {
		title: `Produkt ${product?.name}`,
		description: `${product?.description}`,
		openGraph: {
			title: `Produkt ${product?.name}`,
			description: `Opis produktu : ${product?.description}`,
			images: `${product?.images[0]?.url}`,
		},
	};
};

export const generateStaticParams = async () => {
	const { products } = await UseGetProducts();
	return products
		.map((product) => ({
			id: product.id,
		}))
		.slice(0, 1);
};
export default async function ProductModal({ params }: { params: { id: string } }) {
	const product = await useGetProduct(params["id"]);
	if (!product) return null;

	return (
		<Image
			title={product.product?.name ? product.product?.name : ""}
			description={product.product?.description ? product && product.product?.description : ""}
			imageUrl={product.product?.images[0]?.url}
			price={product.product?.price ? product.product?.price : 0}
		/>
	);
}
