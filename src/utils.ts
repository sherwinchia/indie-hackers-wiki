export const getCategoryEmoji = (category: string) => {
	let emoji = ''
	switch (category.toLowerCase()) {
		case 'all':
			emoji = '🌍'
			break
		case 'blog':
			emoji = '📝'
			break
		case 'website':
			emoji = '🌐'
			break
		case 'book':
			emoji = '📚'
			break
		case 'creator':
			emoji = '👨‍🔬'
			break
		case 'community':
			emoji = '💃'
			break
		case 'conference':
			emoji = '🤝'
			break
		case 'newsletter':
			emoji = '📰'
			break
		case 'podcast':
			emoji = '🎙️'
			break
		case 'tool':
			emoji = '🔨'
			break
		case 'youtube':
			emoji = '🎥'
			break
		default:
			emoji = '❓'
			break
	}
	return emoji
}

export const getCapitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getRefExternalLink = (link: string) => {
	return `${link}?ref=indiehacker.wiki`
}
