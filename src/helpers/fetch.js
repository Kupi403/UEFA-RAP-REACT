export async function fetchClips() {
	const response = await fetch('https://midevku.pl/app-clips.json')

	const resData = await response.text()

	if (!response.ok) {
		throw new Error('Failed to fetch clips')
	}
	return resData
}

export default api
