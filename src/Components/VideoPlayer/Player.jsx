import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import Controls from './Controls'
import formatTime from '../../helpers/formatTime'
import { CircularProgress } from '@mui/material'
import './style/Player.scss'

const Player = forwardRef(({ clipList }, ref) => {
	const playerRef = useRef()
	const playerRefFullscreen = useRef()
	const navigate = useNavigate()
	const { category, id } = useParams()
	const [isError, setIsError] = useState(false)
	const [isVideoReady, setIsVideoReady] = useState(false)

	const currentClipId = +id
	const [playerState, setPlayerState] = useState({
		url: null,
		playing: true,
		mute: true,
		volume: 0,
		playerRate: 1.0,
		played: 0,
		loaded: 0,
		seeking: false,
		isDecision: false,
		isReady: false,
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

	const volumes = {
		low: 0.2,
		medium: 0.8,
	}

	const { playing, mute, volume, playerRate, played, seeking, isReady, autoPlay, isFullScreen } = playerState


	const handlePlayPause = e => {
		if (e.target.ariaLabel == 'play/pause' || e.target.tagName == 'VIDEO') {
			setPlayerState({
				...playerState,
				playing: !playerState.playing,
				isDecision: false,
			})
		}
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

	const handleResetPlayer = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(0, 'seconds')
		}
	}

	const handleSetVolume = e => {
		setPlayerState({ ...playerState, volume: +e.target.value / 100, mute: false })
	}

	const hideDecision = () => {
		setPlayerState({ ...playerState, isDecision: false })
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
		setIsBuffering(false)
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
		setPlayerState({ ...playerState, ...state })
	}

	const handlePlayerSeek = newValue => {
		const newTime = parseFloat(newValue.target.value / 100)
		setPlayerState({ ...playerState, played: newTime, seeking: true, playing: false })
		playerRef.current.seekTo(newTime)
	}

	const handlePlayerMouseSeekUp = () => {
		setPlayerState({ ...playerState, seeking: false, playing: true })
	}

	const handleNext = id => {
		if (currentClipId === clipList.length || !isVideoReady) {
			return
		} else {
			hideDecision()
			navigate(`/clips/${category}/${clipList[id].id + 1}`)
			handleResetPlayer()
		}
	}

	const handlePrev = id => {
		if (currentClipId - 1 == 0 || !isVideoReady) {
			return
		} else {
			hideDecision()
			navigate(`/clips/${category}/${clipList[id - 1].id}`)
			handleResetPlayer()
		}
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
			}, 3000)
		}
	}

	const handleEndPlaying = () => {
		handleShowControls()
		setPlayerState({ ...playerState, playing: false })
		setIsBuffering(false)
	}

	const handleFullscreen = () => {
		const prevStatePlaying = playerState.playing
		if (!isFullScreen) {
			if (screenfull.isEnabled) {
				handleHideControls()
				screenfull.request(playerRefFullscreen.current)
				setPlayerState({ ...playerState, isFullScreen: true, playing: !prevStatePlaying })
			}
		} else {
			screenfull.exit()
			setPlayerState({ ...playerState, isFullScreen: false, playing: !prevStatePlaying })
		}
		screenfull.on('change', () =>
			screenfull.isFullscreen
				? setPlayerState({ ...playerState, isFullScreen: true, playing: prevStatePlaying })
				: setPlayerState({ ...playerState, isFullScreen: false, playing: prevStatePlaying })
		)
	}

	useImperativeHandle(ref, () => ({
		playerState,
		handleShowDecision,
		handleNext,
		handlePrev,
	}))

	return (
		<div
			className='player'
			onMouseEnter={handleShowControls}
			onMouseMove={handleShowControls}
			onMouseLeave={handleHideControls}
			style={{ height: '100%', width: '100%' }}
			onDoubleClick={e => e.target.tagName == 'VIDEO' && handleFullscreen()}
			onClick={e => handlePlayPause(e)}
			aria-label='player'
			ref={playerRefFullscreen}>
			{(!isVideoReady || isBuffering) && !playing && (
				<div className='player__loading'>
					<CircularProgress />
				</div>
			)}
			{isError && (
				<div className='player__error'>
					<p>Błąd odczytu</p>
				</div>
			)}
			<ReactPlayer
				className='player__react-player'
				ref={playerRef}
				width='100%'
				height='100%'
				url={clipList[currentClipId - 1].video}
				playing={playing}
				muted={mute}
				onError={() => setIsError(true)}
				volume={volume}
				onReady={() => {
					setIsVideoReady(true)
					getClipDuration()
				}}
				controls={false}
				onStart={() => setIsBuffering(true)}
				autoPlay={autoPlay}
				onProgress={handlePlayerProgress}
				progressInterval={10}
				onEnded={handleEndPlaying}
				onBuffer={() => setIsBuffering(true)}
				onBufferEnd={() => setIsBuffering(false)}
			/>
			<Controls
				playerState={playerState}
				onPlayPause={handlePlayPause}
				onMute={handleMute}
				isHovered={controlsState.show}
				onNext={handleNext}
				onPrev={handlePrev}
				volume={volume}
				volumes={volumes}
				onSetVolume={handleSetVolume}
				currentId={currentClipId}
				clipsLength={clipList.length}
				decision={clipList[currentClipId - 1].decision}
				translation={clipList[currentClipId - 1].translation}
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
})

export default Player
