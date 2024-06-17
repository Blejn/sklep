import { getProductsByCollectionId } from "@/api/products/getProductsByCollection";

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
	} else {
		return [];
	}
};

export default async function CollectionProductPage({
	params: { collectionId },
}: {
	params: { collectionId: string };
}) {
	const data = await getProductsByCollectionId(collectionId);
	return (
		<>
			{/* {<ProductsList products={data.collection?.products ? data.collection?.products : []} />} */}
			<pre>{JSON.stringify(data)}</pre>
		</>
	);
}
