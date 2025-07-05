import { useContext } from 'react'
import { AppContext } from '../store/AppContext'
import Clip from '../pages/Clip'

const TestWrapper = () => {
	const { testClips } = useContext(AppContext)

	if (!testClips || testClips.length === 0) {
		window.location.href = '/test'
		return null
	}

	return (
		<Clip
			clipListOverride={testClips}
			categoryOverride='Test '
		/>
	)
}

export default TestWrapper
