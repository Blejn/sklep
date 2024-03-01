export default async function EloPage({
	params: { date, slug },
}: {
	params: { date: string; slug: string };
}) {
	return (
		<div>
			<h1>
				Blog: {date} / {slug}
			</h1>
		</div>
	);
}
