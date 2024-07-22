import { useRef, useState, useEffect, useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { IconButton, Tooltip } from '@mui/material'
import {
	PlayArrowSharp,
	VolumeUp,
	Pause,
	Fullscreen,
	FullscreenExit,
	VolumeOff,
	VolumeDown,
	ArrowBack,
	ArrowForward,
	Replay5,
	Forward5,
	PlaylistAddCheck,
	Replay,
} from '@mui/icons-material'
import PrettoSlider from './PrettoSlider.js'
import './style/Controls.scss'

const ControlIcons = ({
	playerState,
	onPlayPause,
	onMute,
	decision,
	translation,
	clipsLength,
	onShowDecision,
	clipDuration,
	playedTime,
	onRewind,
	onForward,
	played,
	onSeek,
	onSeekMouseUp,
	onFullscreen,
	isHovered,
	onNext,
	onPrev,
	isFullScreen,
	volumes,
}) => {
	const sliderRef = useRef()
	const { translations } = useContext(AppContext)

	const params = useParams()
	const id = +params.id

	const classname = isHovered ? 'controls__div' : 'controls__div hidden'

	const [volumeIcon, setVolumeIcon] = useState(
		<VolumeUp
			fontSize='medium'
			style={{ color: 'white' }}
		/>
	)

	useEffect(() => {
		if (playerState.volume == 0) {
			setVolumeIcon(
				<VolumeOff
					fontSize='medium'
					style={{ color: 'white' }}
				/>
			)
		} else if (playerState.volume == volumes.low) {
			setVolumeIcon(
				<VolumeDown
					fontSize='medium'
					style={{ color: 'white' }}
				/>
			)
		} else {
			setVolumeIcon(
				<VolumeUp
					fontSize='medium'
					style={{ color: 'white' }}
				/>
			)
		}
	}, [playerState.volume])

	const [playIconTitle, setPlayIconTitle] = useState('Odtwórz')
	const [playIcon, setPlayIcon] = useState(
		<PlayArrowSharp
			fontSize='medium'
			style={{ color: 'white' }}
		/>
	)

	const [loadedTime, setLoadedTime] = useState(0)

	useEffect(() => {
		if (playerState.playing) {
			setPlayIcon(
				<Pause
					sx={{ pointerEvents: 'none' }}
					size='large'
					style={{ color: 'white', border: 'none' }}
				/>
			)
			setPlayIconTitle(translations.controls.pause)
		}
		if (!playerState.playing) {
			setPlayIcon(
				<PlayArrowSharp
					sx={{ pointerEvents: 'none' }}
					fontSize='medium'
					style={{ color: 'white', border: 'none' }}
				/>
			)
			setPlayIconTitle(translations.controls.play)
		}
		if (playerState.played === 1) {
			setPlayIcon(
				<Replay
					sx={{ pointerEvents: 'none' }}
					fontSize='medium'
					style={{ color: 'white', border: 'none' }}
				/>
			)
			setPlayIconTitle(translations.controls.replay)
		}
	}, [playerState.playing])

	useEffect(() => {
		setLoadedTime(playerState.loaded * 100)
	}, [playerState.loaded])

	const fullScreenStyle = isFullScreen ? { position: 'absolute' } : undefined

	return (
		<>
			{playerState.isDecision && (
				<div className='decision-box'>
					<img
						src={decision}
						alt='Decyzja klipu A1'
					/>
					{translation && <p>{translation}</p>}
				</div>
			)}

			<div
				className={classname}
				style={fullScreenStyle}>
				<span className='controls__time'>
					{playedTime} / {clipDuration}
				</span>

				<PrettoSlider
					slotProps={{
						rail: {
							style: { '--buffered-percentage': `${loadedTime}%` },
						},
					}}
					size='small'
					aria-label='pretto slider'
					min={0}
					max={100}
					step={1}
					value={played * 100}
					ref={sliderRef}
					onChange={onSeek}
					onChangeCommitted={onSeekMouseUp}
				/>

				<Grid
					container
					justifyContent='space-between'
					width='100%'
					margin='.5em 0'>
					<Grid
						item
						className='left'>
						<Tooltip
							title={playIconTitle}
							placement='top'>
							<IconButton
								className='controls__icons'
								aria-label='play/pause'
								onClick={onPlayPause}>
								{playIcon}
							</IconButton>
						</Tooltip>
						<Tooltip
							title={translations.controls.rewind5s}
							placement='top'>
							<IconButton
								className='controls__icons'
								aria-label='reqind'
								onClick={onRewind}>
								<Replay5
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							</IconButton>
						</Tooltip>

						<Tooltip
							title={translations.controls.forward5s}
							placement='top'>
							<IconButton
								className='controls__icons'
								aria-label='reqind'
								onClick={onForward}>
								<Forward5
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							</IconButton>
						</Tooltip>
					</Grid>

					<Grid
						item
						className='middle'>
						<div className='middle-wrap'>
							<Tooltip
								title={translations.controls.previousClip}
								placement='top'>
								<span>
									<IconButton
										className='controls__icons'
										onClick={() => onPrev(id)}
										disabled={id === 1}>
										<ArrowBack
											fontSize='medium'
											style={id === 1 ? { color: 'gray' } : { color: 'white' }}
										/>
									</IconButton>
								</span>
							</Tooltip>
							<p style={{ fontSize: '12px' }}>
								{id}/{clipsLength}
							</p>
							<Tooltip
								title={translations.controls.nextClip}
								placement='top'>
								<IconButton
									className='controls__icons'
									onClick={() => onNext(id)}
									disabled={id === clipsLength}>
									<ArrowForward
										fontSize='medium'
										style={id === clipsLength ? { color: 'gray' } : { color: 'white' }}
									/>
								</IconButton>
							</Tooltip>
						</div>
					</Grid>

					<Grid
						item
						className='right'>
						<Tooltip
							title={translations.controls.decision}
							placement='top'>
							<span>
								<IconButton
									className='controls__icons'
									onClick={onShowDecision}>
									<PlaylistAddCheck
										fontSize='medium'
										color='white'
										style={{ color: 'white' }}
									/>
								</IconButton>
							</span>
						</Tooltip>
						<Tooltip
							title={translations.controls.volume}
							placement='top'>
							<IconButton
								className='controls__icons volume-icon'
								aria-label='reqind'
								onClick={e => onMute(e)}>
								{volumeIcon}
							</IconButton>
						</Tooltip>

						<Tooltip
							title={isFullScreen ? translations.controls.exitFullscreen : translations.controls.fullscreen}
							placement='top'>
							<IconButton
								className='controls__icons'
								onClick={onFullscreen}>
								{isFullScreen ? (
									<FullscreenExit
										fontSize='medium'
										style={{ color: 'white' }}
									/>
								) : (
									<Fullscreen
										fontSize='medium'
										style={{ color: 'white' }}
									/>
								)}
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</div>
		</>
	)
}

export default ControlIcons
