import { type ComponentType } from "react";

export default async function StaticPage({ params }: { params: { filename: string } }) {
	const Page = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
	);
	return (
		<article className="prose prose-lg">
			<Page />
		</article>
	);
}
