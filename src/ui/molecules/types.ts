export type ProductListItemType = {
	id: string;
	name: string;
	categories: { name: string }[];
	price: number;
	images: { src: string }[];
};
