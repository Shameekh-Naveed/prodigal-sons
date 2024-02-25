import { atom } from "jotai"

export const LangAtom = atom("en")

export const LoggedInAtom = atom(false)

export const UserAtom = atom(null)

export const SearchAtom = atom({
	command: "",
	category: "",
	sort: ""
})

export const results = atom([])
