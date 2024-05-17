import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/ui/organisms/Navbar";
import { Providers } from "@/utils/query-provider";

const inter = Inter({
	subsets: ["latin", "latin-ext"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata = {
	title: "My way butik",
	description: "My way butik",
};

export default function RootLayout({
	children,
	modal,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
	params: { locale: string };
}>) {
	return (
		<html lang={locale}>
			<body className={inter.variable}>
				<Providers>
					{" "}
					<Navbar />
					<section className="mx-auto max-w-screen-2xl p-12 ">{children}</section>
					<footer className="text-center text-gray-700">
						<p>© 2024 Karina Mazur i Sylwia Wedler</p>
					</footer>
					{modal}
				</Providers>
			</body>
		</html>
	);
}
