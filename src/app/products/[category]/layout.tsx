import { type ReactNode } from "react";
import { UseGetProducts } from "../useProducts";

export const generateStaticParams = async () => {
	const { products } = await UseGetProducts();

	return products.map((product) => ({
		category: product.categories[0]?.slug,
	}));
};
export default function CategoryProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
