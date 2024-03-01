import { ReactNode } from "react";

export const generateStaticParams = async () => {
	return [{ category: "t-shirts" }, { category: "shoes" }];
};
export default function CategoryProductLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
