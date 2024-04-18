import { type ReactNode } from "react";
import { getProducts } from "@/api/products/getProducts";

export const generateStaticParams = async () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const products = await getProducts();

	return products.map((product) => ({
		category: product.categories[0]?.slug,
	}));
};
export default function CategoryProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
