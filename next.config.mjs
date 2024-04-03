import withMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],

	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	redirects: async () => {
		return [
			{ source: "/products/t-shirts", destination: "/products/t-shirts/1", permanent: false },
			{
				source: "/collections/ckdu452ug0gxm0158pysyubmr",
				destination: "/collections/ckdu452ug0gxm0158pysyubmr/1",
				permanent: false,
			},
			{
				source: "/collections/ckdu45fyo0gxx01046eyfmexx",
				destination: "/collections/ckdu45fyo0gxx01046eyfmexx/1",
				permanent: false,
			},
		];
	},
};
// import withMDX from "@next/mdx";

export default withNextIntl(withMDX()(nextConfig));
