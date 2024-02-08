import { type ProductListItemType } from "../molecules/types";

export const products: ProductListItemType[] = [
	{
		id: 1,
		name: "Koszulka 1",
		category: "Koszulki",
		price: 20.99,
		coverImage: {
			src: "/products/product1.jpg",
			alt: "Koszulka 1",
		},
	},
	{
		id: 2,
		name: "Koszulka 2",
		category: "Koszulki",
		price: 25.99,
		coverImage: {
			src: "/products/product2.jpg",
			alt: "Koszulka 2",
		},
	},
	{
		id: 3,
		name: "Koszulka 3",
		category: "Koszulki",
		price: 22.99,
		coverImage: {
			src: "/products/product3.jpg",
			alt: "Koszulka 3",
		},
	},
	{
		id: 4,
		name: "Koszulka 4",
		category: "Koszulki",
		price: 18.99,
		coverImage: {
			src: "/products/product4.jpg",
			alt: "Koszulka 4",
		},
	},
];
