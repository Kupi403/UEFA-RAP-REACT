import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import './App.css'
import Container from '@mui/material/Container'
import ControlIcons from './Components/ControlIcons'
import Navbar from './Components/Navbar'

import A2 from './assets/A2.mp4'
import A3 from './assets/A3.mp4'

const App = () => {
	const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	const playerRef = useRef()

	const [playerState, setPlayerState] = useState({
		playing: true,
		mute: true,
		volume: 0.5,
		isVolumeBar: false,
		playerbackRate: 1.0,
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
		// url: 'https://midevku.pl/clips/2023_2/A/A1.mp4',
		url: url,
		decision:
			'https://raw.githubusercontent.com/Kupi403/UEFA-Refereeing-Assistance-Programme/main/2023-2_assets/decisions/A/A1.png',
	}

	const { playing, mute, volume, playerbackRate, played, seeking, autoPlay, isFullScreen } = playerState
	// console.log(isFullScreen)

	// console.log(playerState.played, seeking)

	const handlePlayPause = () => {
		setPlayerState({
			...playerState,
			playing: !playerState.playing,
			isDecision: false,
		})
	}

	const handleMute = e => {
		if (e.target.localName !== 'input') {
			setPlayerState({
				...playerState,
				mute: !playerState.mute,
			})
		}
	}
	// console.log(playerState.mute, volume)
	const handleSetVolume = e => {
		setPlayerState({ ...playerState, volume: +e.target.value / 100, mute: false })
	}

	// console.log(playerState.mute, playerState.volume)

	const handleShowVolumeBar = () => {
		setPlayerState({ ...playerState, isVolumeBar: true })
	}

	const handleHideVolumeBar = () => {
		setPlayerState({ ...playerState, isVolumeBar: false })
	}

	const handleShowDecision = () => {
		const prevStatePlaying = playerState.playing

		if (!playerState.isDecision) {
			if (playerState.playing) {
				setPlayerState({
					...playerState,
					isDecision: !playerState.isDecision,
					playing: !playerState.playing,
				})
			} else {
				setPlayerState({
					...playerState,
					isDecision: !playerState.isDecision,
					playing: playerState.playing,
				})
			}
		} else {
			setPlayerState({ ...playerState, isDecision: !playerState.isDecision })
			if (prevStatePlaying.playing) {
				setPlayerState({
					...playerState,
					isDecision: !playerState.isDecision,
					playing: prevStatePlaying.playing,
				})
			} else {
				setPlayerState({
					...playerState,
					isDecision: !playerState.isDecision,
					playing: playerState.playing,
				})
			}
		}
		// if (!playerState.isDecision && playerState.playing) {
		// 	console.log(1)
		// 	setPlayerState({
		// 		...playerState,
		// 		isDecision: !playerState.isDecision,
		// 		playing: !prevStatePlaying,
		// 	})
		// } else {
		// 	console.log(2)
		// 	setPlayerState({
		// 		...playerState,
		// 		isDecision: !playerState.isDecision,
		// 		playing: prevStatePlaying,
		// 	})
		// }
		// } else if (!playerState.isDecision && !prevState.playing) {
		// 	console.log(2);
		// 	setPlayerState({
		// 		...playerState,
		// 		isDecision: !playerState.isDecision,
		// 		playing: prevState.playing,
		// 	})
		// } else if(!playerState.isDecision && prevState.playing){
		// 	console.log(3);
		// 	setPlayerState({
		// 		...playerState,
		// 		isDecision: !playerState.isDecision,
		// 		playing: prevState.playing,
		// 	})
		// }
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
		// setPlayerState({ ...playerState, played: newTime, playing: false })
		// playerRef.current.seekTo(newTime)
		setPlayerState({ ...playerState, played: newTime })
		playerRef.current.seekTo(newTime)
	}

	const handlePlayerMouseSeekUp = newValue => {
		console.log(newValue.target)
		const newTime = parseFloat(newValue.target.value / 100)
		console.log(newTime);
		setPlayerState({ ...playerState, seeking: false, played: newTime })
		playerRef.current.seekTo(newTime)
	}

	const handleNext = () => {
		setUrl(A3)
	}

	const handlePrev = () => {
		setUrl(A2)
	}

	const format = seconds => {
		if (isNaN(seconds)) {
			return '00:00'
		}

		const date = new Date(seconds * 1000)
		const hh = date.getUTCHours()
		const mm = date.getUTCMinutes()
		const ss = date.getUTCSeconds().toString().padStart(2, '0')

		if (hh) {
			return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
		} else {
			return `${mm}:${ss}`
		}
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

	const playerRefFullscreen = useRef()

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
	const fullscreenClass = !playerState.isFullScreen ? '50vh' : '100%'

	return (
		<>
			<Navbar />

			<div className='box'>
				<div className='main__section'>
					<div
						className='playerDiv'
						onMouseEnter={handleShowControls}
						onMouseMove={handleShowControls}
						onMouseLeave={handleHideControls}
						ref={playerRefFullscreen}>
						{true ? (
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
						) : (
							<div>
								<LoadingIndicator />
							</div>
						)}

						<ControlIcons
							playerState={playerState}
							onPlayPause={handlePlayPause}
							onMute={handleMute}
							onShowVolumeBar={handleShowVolumeBar}
							isVolumeBar={playerState.isVolumeBar}
							onHideVolumeBar={handleHideVolumeBar}
							isHovered={controlsState.show}
							onNext={handleNext}
							onPrev={handlePrev}
							volume={playerState.volume}
							onSetVolume={handleSetVolume}
							decision={videoExample.decision}
							onShowDecision={handleShowDecision}
							clipDuration={clipDuration}
							playedTime={format(currentPlayerTime)}
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
				</div>
			</div>
		</>
	)
}

export default App
