import Image from "next/image";
import React, { type FC } from "react";

type ProductCoverImageProps = {
	src: string;
	alt: string;
};

export const ProductCoverImage: FC<ProductCoverImageProps> = ({
	src,
	alt,
}: ProductCoverImageProps) => {
	return (
		<div className="relative h-[460px] w-full overflow-hidden rounded-md bg-slate-50 hover:bg-slate-100">
			<Image
				width={320}
				height={320}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
				src={src}
				alt={alt}
			/>
		</div>
	);
};
