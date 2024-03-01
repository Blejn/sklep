import { ReactNode } from "react";

export default function TestLayout({ children }: { children: ReactNode }) {
	return <div className="bg-gray-700 text-black">Page Layout : {children}</div>;
}
