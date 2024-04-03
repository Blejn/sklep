import { getTranslations } from "next-intl/server";

export default async function RestaurantPage() {
	const t = await getTranslations("Contact");
	return (
		<div>
			<h1>{t("title")}</h1>
		</div>
	);
}
