import { useRef, useState, forwardRef, useImperativeHandle, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import Controls from './Controls'
import formatTime from '../../helpers/formatTime'
import { CircularProgress } from '@mui/material'
import isIOSDevice from '../../helpers/isIOSDevice'
import './style/Player.scss'

const Player = forwardRef(({ clipList }, ref) => {
	const playerRef = useRef()
	const playerRefFullscreen = useRef()
	const navigate = useNavigate()
	const { id } = useParams()
	const [isError, setIsError] = useState(false)

	const currentClipId = +id

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
		isVideoReady: false,
		autoPlay: true,
		isFullScreen: false,
	})

	const { playing, mute, volume, played, isVideoReady, autoPlay, isFullScreen } = playerState

	const shouldPlayVideo = isVideoReady || !isBuffering

	const togglePlayPause = useCallback(() => {
		setPlayerState(prev => ({
			...prev,
			playing: !prev.playing,
			isDecision: false,
		}))
	}, [])

	const handlePlayerClick = useCallback(
		e => {
			if (e.target.tagName === 'VIDEO') {
				togglePlayPause()
			}
		},
		[togglePlayPause]
	)

	const handleMute = useCallback(() => {
		setPlayerState(prev => {
			if (prev.volume === volumes.low) {
				return { ...prev, mute: false, volume: volumes.medium }
			} else if (prev.volume === volumes.medium) {
				return { ...prev, mute: true, volume: 0 }
			} else {
				return { ...prev, mute: false, volume: volumes.low }
			}
		})
	}, [volumes])

	const handleResetPlayer = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(0, 'seconds')
		}
	}

	const hideDecision = () => {
		setPlayerState({ ...playerState, isDecision: false })
	}

	const handleShowDecision = useCallback(() => {
		setPlayerState(prev => ({
			...prev,
			isDecision: !prev.isDecision,
			playing: prev.isDecision ? prev.playing : false,
		}))
	}, [])

	const getClipDuration = () => {
		setIsBuffering(false)
		const duration = new Date(playerRef.current.getDuration() * 1000).toISOString().substr(14, 5)
		setClipDuration(duration)
		handleHideControls()
	}

	const handleRewind = useCallback(() => {
		if (playerRef.current) {
			playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5, 'seconds')
		}
	}, [])

	const handleForward = useCallback(() => {
		if (playerRef.current) {
			playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5, 'seconds')
		}
	}, [])

	const handlePlayerProgress = state => {
		setPlayerState({ ...playerState, ...state })
	}

	const handlePlayerSeek = useCallback(newValue => {
		const newTime = parseFloat(newValue.target.value / 100)
		setPlayerState(prev => ({
			...prev,
			played: newTime,
			seeking: true,
			playing: false,
		}))
		playerRef.current?.seekTo(newTime)
	}, [])

	const handlePlayerMouseSeekUp = useCallback(() => {
		setPlayerState(prev => ({
			...prev,
			seeking: false,
			playing: true,
		}))
	}, [])

	const handleVideoReady = ready => {
		setIsBuffering(!ready)
		setPlayerState(prev => ({ ...prev, isVideoReady: ready }))
	}

	const handleNext = useCallback(
		id => {
			if (currentClipId === clipList.length || !playerState.isVideoReady) return
			hideDecision()
			navigate(`../${clipList[id].id + 1}`, { relative: 'path' })
			handleResetPlayer()
		},
		[currentClipId, clipList, navigate, playerState.isVideoReady]
	)

	const handlePrev = useCallback(
		id => {
			if (currentClipId - 1 === 0 || !playerState.isVideoReady) return
			hideDecision()
			navigate(`../${clipList[id - 1].id}`, { relative: 'path' })
			handleResetPlayer()
		},
		[currentClipId, clipList, navigate, playerState.isVideoReady]
	)

	const handleShowControls = useCallback(() => {
		setControlsState(prev => (prev.hide ? { show: true, hide: false, isHiding: false } : prev))
	}, [])

	const handleHideControls = useCallback(() => {
		setControlsState(prev => {
			if (prev.show && !prev.isHiding) {
				setTimeout(() => {
					setControlsState({ show: false, hide: true, isHiding: false })
				}, 3000)
				return { ...prev, isHiding: true }
			}
			return prev
		})
	}, [])

	const handleEndPlaying = () => {
		handleShowControls()
		setPlayerState({ ...playerState, playing: false })
		setIsBuffering(false)
	}

	const handleFullscreen = useCallback(() => {
		if (!screenfull.isEnabled) return
		handleHideControls()
		if (!screenfull.isFullscreen) {
			screenfull.request(playerRefFullscreen.current)
		} else {
			screenfull.exit()
		}
	}, [handleHideControls])

	useEffect(() => {
		const handleKeydown = event => {
			switch (event.keyCode) {
				case 32: // space
					event.preventDefault()
					setPlayerState(prev => ({
						...prev,
						playing: !prev.playing,
						isDecision: false,
					}))
					break
				case 37: // left arrow
					handlePrev(currentClipId)
					break
				case 39: // right arrow
					handleNext(currentClipId)
					break

				case 68: // 'd'
					handleShowDecision()
					break

				case 70: // 'f'
					handleFullscreen()
					break

				default:
					break
			}
		}
		document.addEventListener('keydown', handleKeydown)
		return () => document.removeEventListener('keydown', handleKeydown)
	})

	useEffect(() => {
		if (!screenfull.isEnabled) return

		const handleScreenfullChange = () => {
			setPlayerState(prev => ({
				...prev,
				isFullScreen: screenfull.isFullscreen,
			}))
		}

		screenfull.on('change', handleScreenfullChange)

		return () => {
			screenfull.off('change', handleScreenfullChange)
		}
	}, [])

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
			aria-label='player'
			ref={playerRefFullscreen}>
			{isBuffering && playing && (
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
				onClick={handlePlayerClick}
				width='100%'
				height='100%'
				url={clipList[currentClipId - 1].video}
				playing={playing}
				muted={mute}
				onError={() => setIsError(true)}
				volume={volume}
				controls={isIOSDevice()}
				playsinline={isIOSDevice()}
				autoPlay={autoPlay}
				onProgress={handlePlayerProgress}
				progressInterval={10}
				onEnded={handleEndPlaying}
				onBuffer={() => setIsBuffering(true)}
				onBufferEnd={() => setIsBuffering(false)}
				onReady={() => {
					handleVideoReady(true)
					getClipDuration()
				}}
			/>
			{!isIOSDevice() && (
				<Controls
					playerState={playerState}
					// onPlayPause={handlePlayPause}
					onPlayPause={togglePlayPause}
					onMute={handleMute}
					isHovered={controlsState.show}
					onNext={handleNext}
					onPrev={handlePrev}
					volumes={volumes}
					clipsLength={clipList.length}
					decision={clipList[currentClipId - 1].decision}
					translation={clipList[currentClipId - 1].translation}
					onShowDecision={handleShowDecision}
					clipDuration={clipDuration}
					playedTime={formatTime(currentPlayerTime)}
					played={played}
					onRewind={handleRewind}
					onForward={handleForward}
					onSeek={handlePlayerSeek}
					onSeekMouseUp={handlePlayerMouseSeekUp}
					onFullscreen={handleFullscreen}
					isFullScreen={isFullScreen}
					shouldPlayVideo={shouldPlayVideo}
				/>
			)}
		</div>
	)
})

export default Player
