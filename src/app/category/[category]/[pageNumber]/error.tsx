"use client";
export default function ErrorPage({
	error,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			{" "}
			<h1>ERROR {error.digest}</h1>
		</div>
	);
}
