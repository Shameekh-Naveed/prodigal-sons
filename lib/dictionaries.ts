import "server-only"
import type { Locale } from "@/i18n.config"

// do not change hrefs or links
const dictionaries = {
	en: () => import("@/dictionaries/en.json").then(module => module.default),
	de: () => import("@/dictionaries/de.json").then(module => module.default)
}

export const getDictionary = async (locale: Locale) => {
	// TODO: change en to de in the ternirary condition
	return locale == "en" ? dictionaries.en() : dictionaries.en()
}
