import { type Metadata } from "next";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchProductById } from "@/server/products";
import { Product } from "@/ui/organisms/Product";

export const generateMetadata = async ({
	params: { id },
}: {
	params: { id: string };
}): Promise<Metadata | undefined> => {
	try {
		const product = await fetchProductById(id);

		if (product) {
			return {
				title: `Produkt ${product.name}`,
				description: "Opis produktu",
				openGraph: {
					title: `Produkt ${product.name}`,
					description: `Opis produktu ${product.description}`,
					images: product.images[0]?.url,
				},
			};
		} else {
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching product metadata:", error);
		return undefined;
	}
};

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["product", id],
		queryFn: async () => fetchProductById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Product id={id} />
		</HydrationBoundary>
	);
}
