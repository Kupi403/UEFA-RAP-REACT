import { useRef, useEffect, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import Player from '../Components/VideoPlayer/Player'
import { useParams } from 'react-router-dom'
import api from '../assets/app-clips.json'
import { useSwipeable } from 'react-swipeable'
import PageHeader from '../Components/PageHeader'
import { IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import setTitle from '../helpers/setDocumentTitle'
import './styles/Clip.scss'

const Clip = () => {
	const { category, id } = useParams()
	const letter = category.toUpperCase()
	const clipList = api[letter].content
	const playerRef = useRef()
	const currentClipId = +id
	const playerWrapperRef = useRef()

	const isSafari = () => {
		const userAgent = navigator.userAgent
		const vendor = navigator.vendor
		const isSafari = /Safari/.test(userAgent) && /Apple/.test(vendor) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(userAgent)
		return isSafari
	}

	const { language, version, translations } = useContext(AppContext)

	useEffect(() => {
		setTitle(version, `${category}${id}`)
	}, [id])

	const handlers = useSwipeable({
		onSwipedRight: e => {
			if (e.event.target.localName === 'span') return

			if (playerRef.current) playerRef.current.handlePrev(currentClipId)
		},
		onSwipedLeft: e => {
			if (e.event.target.localName === 'span') return
			if (playerRef.current) playerRef.current.handleNext(currentClipId)
		},
		delta: 150,
		swipeDuration: 250,
	})

	if (+id > clipList.length || +id < 0) {
		throw new Error(
			language === 'pl'
				? `Nie odnaleziono podanego klipu ${category}${id} w wersji UEFA RAP ${version}`
				: `Clip '${category}${id}' not found in the UEFA RAP version ${version}`
		)
	}

	return (
		<div
			className='clip'
			{...handlers}
			ref={playerWrapperRef}>
			<PageHeader
				link={`/clips/${letter}`}
				spanText={translations.home[category.toLowerCase()]}
				titleText={`${category}${id}`}
			/>

			<Player
				ref={playerRef}
				clipList={clipList}
			/>

			<div className={isSafari() ? 'clip__controls' : ' clip__controls clip__controls--no-safari'}>
				<span>
					<IconButton
						className='controls__icons'
						onClick={() => playerRef.current.handlePrev(currentClipId)}
						disabled={id == 1}>
						<ArrowBack
							fontSize='large'
							style={id == 1 ? { color: 'gray' } : { color: 'white' }}
						/>
					</IconButton>
				</span>
				<p style={{ fontSize: '20px' }}>
					{id}/{clipList.length}
				</p>

				<IconButton
					className='controls__icons'
					onClick={() => playerRef.current.handleNext(currentClipId)}
					disabled={+id === clipList.length}>
					<ArrowForward
						fontSize='large'
						style={+id === clipList.length ? { color: 'gray' } : { color: 'white' }}
					/>
				</IconButton>
			</div>

			{api.dictionary[letter] && language === 'pl' && (
				<div className='clip__dictionary'>
					<h3 className='clip__dictionary-title'>Słownik</h3>
					<table
						border='1'
						className='clip__dictionary-table clip__dictionary-table--show'>
						<tbody>
							{Object.entries(api.dictionary[letter]).map(([english, polish]) => (
								<tr
									key={english}
									className='clip__dictionary-item'>
									<td className='clip__dictionary-item--english'>{english}</td>

									<td className='clip__dictionary-item--polish'>{polish}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default Clip
