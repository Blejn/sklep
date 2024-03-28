import { Paggination } from "@/ui/organisms/Paggination";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { getProductsByCategory } from "@/utils/api/products/getProductsByCategory";

// export async function generateStaticParams({
// 	params: { category },
// }: {
// 	params: { category: string };
// }) {
// 	const { pageArray } = await getProductsByCategory(category, pageNumber);

// 	return pageArray.map((pageNumber) => ({
// 		pageNumber: pageNumber.toString(),
// 	}));
// }
export default async function CategoryProductPage({
	params: { category, pageNumber },
}: {
	params: { category: string; pageNumber: string };
}) {
	const { products, pageInfo, aggregate } = await getProductsByCategory(category, pageNumber);
	const { count } = aggregate;

	const pageTotal = Math.ceil(count / 4);
	const pageArray = Array.from({ length: pageTotal }, (_, i) => i + 1);

	return (
		<>
			<ProductsList products={products} />
			<Paggination
				pageInfo={pageInfo}
				pageArray={pageArray}
				category={category}
				pageNumber={pageNumber}
			/>
		</>
	);
}
