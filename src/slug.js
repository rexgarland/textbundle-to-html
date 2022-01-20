export function sluggify(stem) {
	// turn spaces into dashes
	// place dashes in bewteen camelCase
	// remove upper case
	const noSpaces = stem.replace(/\s+/g,'-')
	const noCamels = noSpaces.replace(/([a-z])([A-Z])/g,'$1-$2')
	const slug = noCamels.toLocaleLowerCase()
	return slug
}