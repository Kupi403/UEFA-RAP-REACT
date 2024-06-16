import { useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { Button, Slider, CircularProgress, IconButton } from '@mui/material'
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
	ArrowBack,
	ArrowForward,
	Replay5,
	Forward5,
} from '@mui/icons-material'
import './ControlIcons.css'

const PrettoSlider = styled(Slider)({
		color: '#52af77',
		height: 8,
		'& .MuiSlider-track': {
			border: 'none',
		},
		'& .MuiSlider-thumb': {
			height: 9,
			width: 15,
			borderRadius: '0',
			backgroundColor: '#fff',
			border: '2px solid currentColor',
			'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
				boxShadow: 'inherit',
			},
			'&::before': {
				display: 'none',
			},
		},
		'& .MuiSlider-valueLabel': {
			lineHeight: 1.2,
			fontSize: 12,
			background: 'unset',
			padding: 0,
			width: 32,
			height: 32,
			// borderRadius: '50% 50% 50% 0',
			backgroundColor: '#52af77',
			transformOrigin: 'bottom left',
			transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
			'&::before': { display: 'none' },
			'&.MuiSlider-valueLabelOpen': {
				transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
			},
			'& > *': {
				transform: 'rotate(45deg)',
			},
		},
	})

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
	onNext,
	onPrev,
	isFullScreen,
}) => {
	


	const CustomSlider = styled(Slider)(({ theme }) => ({
		color: 'blue', //color of the slider between thumbs
		'& .MuiSlider-thumb': {
			backgroundColor: 'green', //color of thumbs
		},
		'& .MuiSlider-rail': {
			color: 'lime', ////color of the slider outside  teh area between thumbs
		},
	}))

	const sliderRef = useRef()

	console.log(sliderRef);

	

	const classname = isHovered ? 'controls__div' : 'controls__div hidden'

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
				{/* </Scrollbars> */}

				<Grid
					container
					justifyContent='space-between'
					width='100%'>
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
						<IconButton className='controls__icons'>
							<Speed
								fontSize='medium'
								style={{ color: 'white' }}
							/>
						</IconButton>
						<IconButton
							className='controls__icons volume-icon'
							aria-label='reqind'
							onClick={e => onMute(e)}
							onMouseEnter={e => onShowVolumeBar(e)}
							onMouseLeave={onHideVolumeBar}>
							{isVolumeBar && (
								<div className='volume-icon-slider'>
									<input
										type='range'
										value={volume * 100}
										onChange={e => onSetVolume(e)}
									/>
								</div>
							)}
							{!playerState.mute ? (
								<VolumeUp
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							) : (
								<VolumeOff
									fontSize='medium'
									style={{ color: 'white' }}
								/>
							)}
						</IconButton>
						{/* <Typography style={{ color: '#fff', paddingTop: '5px' }}>40</Typography>
					<Slider
						orientation='vertical'
						min={0}
						max={100}
						defaultValue={100}
						className='volume__slider'
					/> */}

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