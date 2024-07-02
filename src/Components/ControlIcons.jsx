import { useRef, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Button, Slider, CircularProgress, IconButton, Tooltip } from '@mui/material'
import {
	PlayArrowSharp,
	FastForwardSharp,
	Speed,
	VolumeUp,
	Pause,
	FastForward,
	FastRewind,
	Fullscreen,
	FullscreenExit,
	VolumeOff,
	VolumeMute,
	VolumeDown,
	ArrowBack,
	ArrowForward,
	Replay5,
	Forward5,
} from '@mui/icons-material'
import PrettoSlider from './VideoPlayer/PrettoSlider.js'
import './ControlIcons.css'

// const PrettoSlider = styled(Slider)({
// 		color: '#52af77',
// 		height: 8,
// 		transition:'none',
// 		'& .MuiSlider-track': {
// 			border: 'none',
// 			transition:'none',
// 		},
// 		'& .MuiSlider-thumb': {
// 			height: 9,
// 			width: 15,
// 			borderRadius: '0',
// 			backgroundColor: '#fff',
// 			transition:'none',
// 			border: '2px solid currentColor',
// 			'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
// 				boxShadow: 'inherit',
// 			},
// 			'&::before': {
// 				display: 'none',
// 			},
// 		},
// 		'& .MuiSlider-valueLabel': {
// 			transition:'none',
// 			lineHeight: 1.2,
// 			fontSize: 12,
// 			background: 'unset',
// 			padding: 0,
// 			width: 32,
// 			height: 32,
// 			// borderRadius: '50% 50% 50% 0',
// 			backgroundColor: '#52af77',
// 			transformOrigin: 'bottom left',
// 			transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
// 			'&::before': { display: 'none' },
// 			'&.MuiSlider-valueLabelOpen': {
// 				transition:'none',
// 				transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
// 			},
// 			'& > *': {
// 				transition:'none',
// 				transform: 'rotate(45deg)',
// 			},
// 		},
// 	})

const ControlIcons = ({
	playerState,
	onPlayPause,
	onMute,
	decision,
	onShowDecision,
	clipDuration,
	playedTime,
	onRewind,
	onForward,
	played,
	onSeek,
	onSeekMouseUp,
	onShowVolumeBar,
	onSetVolume,
	isVolumeBar,
	volume,
	onFullscreen,
	isHovered,
	isBuffering,
	onHideVolumeBar,
	handleChangeRate,
	onNext,
	onPrev,
	isFullScreen,
	volumes,
}) => {
	// console.log(played)

	const sliderRef = useRef()

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


	return (
		<>
			{playerState.isDecision && (
				<div className='decision-box'>
					<img
						src={decision}
						alt='Decyzja klipu A1'
					/>
				</div>
			)}

			<div className={classname}>
				{isBuffering && (
					<div className='loading'>
						<CircularProgress />
					</div>
				)}

				<Typography>
					<span>
						{playedTime} / {clipDuration}
					</span>
				</Typography>

				<PrettoSlider
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

				{/* <Controls /> */}

				<Grid
					container
					justifyContent='space-between'
					width='100%'
					marginBottom='.5rem'>
					<div className='left'>
						<Grid item>
							<IconButton
								className='controls__icons'
								aria-label='reqind'
								onClick={onPlayPause}>
								{playerState.playing ? (
									<Pause
										fontSize='medium'
										style={{ color: 'white', border: 'none' }}
									/>
								) : (
									<PlayArrowSharp
										fontSize='medium'
										style={{ color: 'white', border: 'none' }}
									/>
								)}
							</IconButton>
							<IconButton
								className='controls__icons'
								aria-label='reqind'
								onClick={onRewind}>
								<Replay5
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							</IconButton>

							<IconButton
								className='controls__icons'
								aria-label='reqind'
								onClick={onForward}>
								<Forward5
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							</IconButton>
						</Grid>
						<Grid
							item
							className='middle'>
							<div className='middle-wrap'>
								<IconButton
									className='controls__icons'
									onClick={onPrev}>
									<ArrowBack
										fontSize='medium'
										style={{ color: 'white' }}
									/>
								</IconButton>
								<p style={{ fontSize: '12px' }}>1/60</p>
								<IconButton
									className='controls__icons'
									onClick={onNext}>
									<ArrowForward
										fontSize='medium'
										style={{ color: 'white' }}
									/>
								</IconButton>
							</div>
						</Grid>
					</div>

					<Grid
						item
						className='right'>
						<Button
							className='Button'
							onClick={onShowDecision}>
							Decision
						</Button>
						<Tooltip
						title={`${playerState.playerRate}x`}
							placement='top'>
							<IconButton className='controls__icons' onClick={handleChangeRate}>
								<Speed
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							</IconButton>
						</Tooltip>
						<IconButton
							className='controls__icons volume-icon'
							aria-label='reqind'
							onClick={e => onMute(e)}>
							{volumeIcon}
						</IconButton>

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
					</Grid>
				</Grid>
			</div>
		</>
	)
}

export default ControlIcons
