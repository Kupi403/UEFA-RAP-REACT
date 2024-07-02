import { useRef, useState, useContext,useEffect } from 'react'
import ReactPlayer from 'react-player'
import playerStateCtx from './VideoStateContext'
import screenfull from 'screenfull'
import ControlIcons from '../ControlIcons'
import A2 from '../../assets/A2.mp4'
import A3 from '../../assets/A3.mp4'
import '../../App.css'
import formatTime from '../../helpers/formatTime'
import { CleaningServices } from '@mui/icons-material'

const Player = () => {
	const playerRef = useRef()
	const playerRefFullscreen = useRef()

	const [playerState, setPlayerState] = useState({
		playing: true,
		mute: true,
		volume: 0,
		playerRate: 1.0,
		played: 0,
		seeking: false,
		isDecision: false,
		autoPlay: true,
		isFullScreen: false,
	})

	const [clipDuration, setClipDuration] = useState('00:00')
	const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00'
	const [isBuffering, setIsBuffering] = useState(false)
	const [controlsState, setControlsState] = useState({
		show: true,
		hide: false,
		isHiding: false,
	})
	const [url, setUrl] = useState(A2)

	const videoExample = {
		url: url,
		decision:
			'https://raw.githubusercontent.com/Kupi403/UEFA-Refereeing-Assistance-Programme/main/2023-2_assets/decisions/A/A1.png',
	}

	const { playing, mute, volume, playerRate, played, seeking, autoPlay, isFullScreen } = playerState
	const fullscreenClass = !playerState.isFullScreen ? '50vh' : '100%'

	const handlePlayPause = () => {
		setPlayerState({
			...playerState,
			playing: !playerState.playing,
			isDecision: false,
		})
	}

	const volumes = {
		low: 0.2,
		medium: 0.8,
	}

	const handleMute = e => {
		if (volume == volumes.low) {
			setPlayerState({
				...playerState,
				mute: false,
				volume: volumes.medium,
			})
		} else if (volume == volumes.medium) {
			setPlayerState({
				...playerState,
				mute: true,
				volume: 0,
			})
        } else if (volume == 0) {
			setPlayerState({
				...playerState,
				mute: false,
				volume: volumes.low,
			})
		}
	} 

	const handleChangeRate = () => {
		
	}

	const handleSetVolume = e => {
		setPlayerState({ ...playerState, volume: +e.target.value / 100, mute: false })
	}

	const handleShowVolumeBar = () => {
		setPlayerState({ ...playerState, isVolumeBar: true })
	}

	const handleHideVolumeBar = () => {
		setPlayerState({ ...playerState, isVolumeBar: false })
	}

	const handleShowDecision = () => {
		const prevStatePlaying = playerState.playing

		if (!playerState.isDecision && playerState.playing) {
			setPlayerState({
				...playerState,
				isDecision: !playerState.isDecision,
				playing: !prevStatePlaying,
			})
		} else if (!playerState.isDecision && !prevStatePlaying) {
			setPlayerState({
				...playerState,
				isDecision: !playerState.isDecision,
				playing: prevStatePlaying,
			})
		} else if (!playerState.isDecision && prevStatePlaying) {
			setPlayerState({
				...playerState,
				isDecision: !playerState.isDecision,
				playing: prevStatePlaying,
			})
		} else {
			setPlayerState({
				...playerState,
				isDecision: !playerState.isDecision,
				playing: !prevStatePlaying,
			})
		}
	}

	const getClipDuration = () => {
		const duration = new Date(playerRef.current.getDuration() * 1000).toISOString().substr(14, 5)
		setClipDuration(duration)
		handleHideControls()
	}

	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5, 'seconds')
	}

	const handleForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5, 'seconds')
	}

	const handlePlayerProgress = state => {
		if (!playerState.seeking) {
			setPlayerState({ ...playerState, ...state })
		}
	}

	const handlePlayerSeek = newValue => {
		const newTime = parseFloat(newValue.target.value / 100)
		setPlayerState({ ...playerState, played: newTime, seeking: true, playing: false })
		playerRef.current.seekTo(newTime)
	}

	const handlePlayerMouseSeekUp = () => {
		setPlayerState({ ...playerState, seeking: false, playing: true })
	}

	const handleNext = () => {
		setUrl(A3)
	}

	const handlePrev = () => {
		setUrl(A2)
	}

	const lol = () => {
		setIsBuffering(true)
	}

	const lol2 = () => {
		setIsBuffering(false)
	}

	const handleShowControls = () => {
		if (controlsState.hide) {
			setControlsState({ show: true, hide: false, isHiding: false })
		}
	}

	const handleHideControls = () => {
		if (controlsState.show && !controlsState.isHiding) {
			setControlsState({ ...controlsState, isHiding: true })
			setTimeout(() => {
				setControlsState({ show: false, hide: true, isHiding: false })
			}, 1500)
		}
	}

	const handleEndPlaying = () => {
		setPlayerState({ ...playerState, playing: false })
	}

	const handleFullscreen = () => {
		if (!isFullScreen) {
			if (screenfull.isEnabled) {
				screenfull.request(playerRefFullscreen.current)
				setPlayerState({ ...playerState, isFullScreen: true })
			}
		} else {
			screenfull.exit()
			setPlayerState({ ...playerState, isFullScreen: false })
		}
		screenfull.on('change', () =>
			screenfull.isFullscreen
				? setPlayerState({ ...playerState, isFullScreen: true })
				: setPlayerState({ ...playerState, isFullScreen: false })
		)
	}




	return (
		<div
			className='playerDiv'
			onMouseEnter={handleShowControls}
			onMouseMove={handleShowControls}
			onMouseLeave={handleHideControls}
			ref={playerRefFullscreen}>
			<ReactPlayer
				ref={playerRef}
				width={'100%'}
				height={fullscreenClass}
				url={videoExample.url}
				playing={playing}
				muted={mute}
				volume={volume}
				onReady={getClipDuration}
				autoPlay={autoPlay}
				onProgress={handlePlayerProgress}
				progressInterval={10}
				onEnded={handleEndPlaying}
				// fallback={lol}
				onBuffer={lol}
				onBufferEnd={lol2}
			/>

			<ControlIcons
				playerState={playerState}
				onPlayPause={handlePlayPause}
				onMute={handleMute}
				isHovered={controlsState.show}
				onNext={handleNext}
				onPrev={handlePrev}
				volume={volume}
				volumes={volumes}
				onSetVolume={handleSetVolume}
				decision={videoExample.decision}
				onShowDecision={handleShowDecision}
				clipDuration={clipDuration}
				playedTime={formatTime(currentPlayerTime)}
				currentTime={currentPlayerTime}
				played={played}
				isBuffering={isBuffering}
				onRewind={handleRewind}
				onForward={handleForward}
				onSeek={handlePlayerSeek}
				onSeekMouseUp={handlePlayerMouseSeekUp}
				onFullscreen={handleFullscreen}
				isFullScreen={isFullScreen}
				
			/>
		</div>
	)
}

export default Player
