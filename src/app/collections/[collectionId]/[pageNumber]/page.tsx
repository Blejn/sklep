import { ProductsList } from "@/ui/organisms/ProductsList";
import { getProductsByCollectionId } from "@/utils/api/products/getProductsByCollection";

export const generateStaticParams = async ({ params }: { params: { collectionId: string } }) => {
	if ((params.collectionId = "ckdu452ug0gxm0158pysyubmr")) {
		return [
			{
				pageNumber: "1",
			},
			{
				pageNumber: "2",
			},
		];
	}
};

export default async function CollectionProductPage({
	params: { collectionId, pageNumber },
}: {
	params: { collectionId: string; pageNumber: string };
}) {
	const data = await getProductsByCollectionId(collectionId);
	return (
		<>
			{<ProductsList products={data.collection?.products ? data.collection?.products : []} />}
			<pre>{JSON.stringify(data)}</pre>
		</>
	);
}
