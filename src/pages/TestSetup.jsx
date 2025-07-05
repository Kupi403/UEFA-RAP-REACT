import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../store/AppContext'
import PageHeader from '../Components/PageHeader'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import './styles/TestSetup.scss'

const TestSetup = () => {
	const [selectedLetters, setSelectedLetters] = useState([])
	const [clipCount, setClipCount] = useState(null)
	const navigate = useNavigate()
	const { api, setTestClips, version, translations } = useContext(AppContext)
	const allClips = selectedLetters.flatMap(letter => api[letter].content)
	const uniqueClips = Array.from(new Set(allClips.map(JSON.stringify))).map(JSON.parse)

	const CLIP_AMOUNT = [5, 10, 20, 30]

	const availableLetters = Object.keys(api).filter(letter => letter.length === 1 && /[A-N]/.test(letter))

	const handleLetterChange = letter => {
		setSelectedLetters(prev => (prev.includes(letter) ? prev.filter(l => l !== letter) : [...prev, letter]))
		setClipCount(null)
	}

	const handleSubmitClips = () => {
		if (selectedLetters.length === 0) return alert(translations.test.warnAtLeastOne)
		if (!clipCount) return alert(translations.test.selectWarn)
		const allClips = selectedLetters.flatMap(letter => api[letter].content)

		if (allClips.length === 0) return alert(translations.test.noClips)

		const uniqueClips = Array.from(new Set(allClips.map(JSON.stringify))).map(JSON.parse)

		const shuffled = uniqueClips.sort(() => Math.random() - 0.5)

		const safeCount = Math.min(clipCount, shuffled.length)
		const selectedClips = shuffled.slice(0, safeCount)

		const generatedClips = selectedClips.map((clip, index) => ({ ...clip, id: index }))
		setTestClips(generatedClips)
		navigate(`1`)
	}

	return (
		<div className='test-setup'>
			<PageHeader
				spanText='Menu'
				titleText={`${translations.test.mainHeader} ${version}`}
			/>
			<h2>{translations.test.mainText}</h2>
			<p>{translations.test.header}</p>

			<div className='test-setup__letters'>
				<div className={`test-setup__letters--clear-btn ${selectedLetters.length === 0 ? 'disabled' : ''}`}>
					<IconButton
						edge='end'
						color='inherit'
						style={{ borderRadius: '8px', fontSize: 'inherit' }}
						aria-label='test'
						onClick={() => setSelectedLetters([])}>
						<Delete />
						<span>{translations.test.clear}</span>
					</IconButton>
				</div>
				<div className='test-setup__letters--labels'>
					{availableLetters.map(letter => (
						<label
							key={letter}
							className={selectedLetters.includes(letter) ? 'active' : ''}>
							<input
								type='checkbox'
								checked={selectedLetters.includes(letter)}
								onChange={() => handleLetterChange(letter)}
							/>
							{`${letter} - ${translations.home[letter.toLowerCase()]} (${api[letter].content.length})`}
						</label>
					))}
				</div>
			</div>

			<div className='test-setup__count'>
				<label>
					{translations.test.amount}

					<select
						disabled={selectedLetters.length === 0}
						value={clipCount ?? ''}
						onChange={e => setClipCount(+e.target.value)}>
						<option
							value=''
							disabled>
							{translations.test.selectDefault}
						</option>
						{CLIP_AMOUNT.map(amount => (
							<option
								key={amount}
								value={amount}
								disabled={uniqueClips.length < amount}>
								{amount}
							</option>
						))}
					</select>
				</label>
				{uniqueClips.length > 0 && <span className='test-setup__count--amount'>/{uniqueClips.length}</span>}
			</div>

			<button
				className='test-setup__start'
				onClick={handleSubmitClips}>
				{translations.test.button}
			</button>
		</div>
	)
}

export default TestSetup
