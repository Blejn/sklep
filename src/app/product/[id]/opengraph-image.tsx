import { ImageResponse } from "next/og";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/server/products";

export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Product";
export const size = {
	width: 1200,
	height: 630,
};

export default async function Image({ params: { id } }: { params: { id: string } }) {
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({ queryKey: ["product"], queryFn: () => fetchProductById(id) });
	if (isError) return <div>Error</div>;
	if (isLoading) return <div>...Loading</div>;
	if (product)
		return new ImageResponse(
			(
				<div
					style={{
						fontSize: "32px",
						fontFamily: "Arial, sans-serif",
						color: "white",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
						backgroundImage: "linear-gradient(135deg, #0072ff, #00c6ff)",
						padding: "50px",
					}}
				>
					<h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>{product?.name}</h1>
					<p style={{ margin: "0 0 20px 0", textAlign: "center" }}>{product?.description}</p>
					<span
						style={{
							backgroundColor: "#ffffffaa",
							color: "black",
							padding: "10px",
							borderRadius: "5px",
						}}
					>
						Kategoria: {product.categories[0]?.name}
					</span>
					{product?.images[0] ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={product?.images[0].url}
							alt="Miniaturka produktu"
							style={{
								maxWidth: "100%",
								maxHeight: "200px",
								objectFit: "contain",
								borderRadius: "10px",
							}}
						/>
					) : (
						<></>
					)}
				</div>
			),
			{ ...size },
		);
}
