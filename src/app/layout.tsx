import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/ui/organisms/Navbar";
import { navbarListItem } from "@/utils/mocks/navbarCategoriesData";

const inter = Inter({
	subsets: ["latin", "latin-ext"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata = {
	title: "My way butik",
    description:"My way butik"
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<Navbar navbarListItem={navbarListItem} />

				<section className="mx-auto max-w-screen-2xl p-12 ">{children}</section>
				<footer className="text-center text-gray-700">
					<p>© 2024 Karina Mazur i Sylwia Wedler</p>
				</footer>
			</body>
		</html>
	);
}
