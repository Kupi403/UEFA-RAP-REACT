import {useRef} from 'react'
import ReactPlayer from 'react-player'

const Player = () => {

    const playerRef = useRef()
    const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00'

	return (
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
	)
}

export default Player
