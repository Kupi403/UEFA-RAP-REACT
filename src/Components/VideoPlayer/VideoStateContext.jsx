import { createContext } from 'react'

export const playerStateCtx = createContext({
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
