import { useRef, useEffect, useContext, useState } from 'react'
import { AppContext } from '../store/AppContext'
import Player from '../Components/VideoPlayer/Player'
import { useParams } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import PageHeader from '../Components/PageHeader'
import { IconButton } from '@mui/material'
import { ArrowBack, ArrowForward, PlaylistAddCheck } from '@mui/icons-material'
import setTitle from '../helpers/setDocumentTitle'
import isIOSDevice from '../helpers/isIOSDevice'
import './styles/Clip.scss'

const Clip = () => {
	const { language, version, translations, api } = useContext(AppContext)
	const [isIOSDecision, setIsIOSDecision] = useState(false)
	const { category, id } = useParams()
	const letter = category.toUpperCase()
	const clipList = api[letter].content
	const playerRef = useRef()
	const currentClipId = +id
	const playerWrapperRef = useRef()


	useEffect(() => {
		setTitle(version, `${category}${id}`)
		isIOSDevice()
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

	if (clipList.length != 0 && (+id > clipList.length || +id < 0)) {
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

			<div className={isIOSDevice() ? 'clip__controls' : ' clip__controls clip__controls--no-safari'}>
				<span>
					<IconButton
						className='controls__icons'
						onClick={() => {
							setIsIOSDecision(false)
							playerRef.current.handlePrev(currentClipId)
						}}
						disabled={id == 1}>
						<ArrowBack
							fontSize='large'
							style={id == 1 ? { color: 'gray' } : { color: 'white' }}
						/>
					</IconButton>
				</span>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<p style={{ color: 'white' }}>
						{id}/{clipList.length}
					</p>

					{isIOSDevice() && (
						<IconButton
							className='controls__icons'
							onClick={() => setIsIOSDecision(!isIOSDecision)}>
							<PlaylistAddCheck
								fontSize='large'
								style={{ color: 'white' }}
							/>
						</IconButton>
					)}
				</div>

				<IconButton
					className='controls__icons'
					onClick={() => {
						setIsIOSDecision(false)
						playerRef.current.handleNext(currentClipId)
					}}
					disabled={+id === clipList.length}>
					<ArrowForward
						fontSize='large'
						style={+id === clipList.length ? { color: 'gray' } : { color: 'white' }}
					/>
				</IconButton>
			</div>
			{isIOSDecision && (
				<div className='controls__ios-decision controls__ios-decision--show'>
					<img
						src={clipList[currentClipId - 1].decision}
						alt={`Decyzja klipu ${category}${id}`}
					/>

					<p>{clipList[currentClipId - 1].translation}</p>
				</div>
			)}

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
