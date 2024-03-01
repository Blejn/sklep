import { ProductsList } from "@/ui/organisms/ProductsList";
import { getProductsByCategory } from "@/utils/api/products/getProductsByCategory";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	if (params.category == "t-shirts") {
		return [
			{
				pageNumber: "1",
			},
			{
				pageNumber: "2",
			},
		];
	} else {
		return [
			{
				pageNumber: "1",
			},
			{
				pageNumber: "2",
			},
			{
				pageNumber: "3",
			},
		];
	}
};
export default async function CategoryProductPage({
	params: { category },
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategory({ slug: category });
	return (
		<>
			<ProductsList products={products} />
			<pre>{JSON.stringify(products, null, 2)}</pre>
		</>
	);
}
