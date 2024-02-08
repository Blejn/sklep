module.exports = {
	semi: true, // chcemy mieć średniki
	singleQuote: false,
	trailingComma: "all", // mamy przecinki wszędzie nawet na końcu
	printWidth: 100, // długość linii
	useTabs: true, // użycie tabów jest lepsze dla ludzi niewidomych, tab jest jednym znakiem, pliki ważą mniej. Na githubie tab ma 8 spacji
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindConfig: "./tailwind.config.ts",
};
