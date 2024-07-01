import React from 'react'
import { Grid, IconButton } from '@mui/material'

const Controls = ({
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
	return (
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
					// onMouseEnter={e => onShowVolumeBar(e)}
					// onMouseLeave={onHideVolumeBar}
				>
					{/* {isVolumeBar && (
                <div className='volume-icon-slider'>
                    <input
                        type='range'
                        value={volume * 100}
                        onChange={e => onSetVolume(e)}
                    />
                </div>
            )} */}
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
	)
}

export default Controls
