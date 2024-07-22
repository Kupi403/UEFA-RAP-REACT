import { styled } from '@mui/material/styles'
import { Slider } from '@mui/material'

const borderRadius = '8px'

const PrettoSlider = styled(Slider)({
	height: 8,
	transition: 'none',
	padding: '0px',
	position: 'relative',
	borderRadius: borderRadius,
	'& .MuiSlider-rail': {
		'&::before': {
			content: '""',
			position: 'absolute',
			height: '100%',
			backgroundColor: 'rgb(250,250,250)',
			borderRadius: borderRadius,
			zIndex: -2,
		},
	},
	'& .MuiSlider-track': {
		border: 'none',
		transition: 'none',
	},
	'& .MuiSlider-thumb': {
		height: 7,
		width: 15,
		borderRadius: '0',
		backgroundColor: '#fff',
		transition: 'none',
		border: '2px solid currentColor',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&::before': {
			display: 'none',
		},
	},
	'& .MuiSlider-valueLabel': {
		transition: 'none',
		lineHeight: 1.2,
		fontSize: 6,
		background: 'unset',
		padding: 0,
		width: 32,
		height: 32,
		backgroundColor: '#52af77',
		transformOrigin: 'bottom left',
		transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
		'&::before': { display: 'none' },
		'&.MuiSlider-valueLabelOpen': {
			transition: 'none',
			transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
		},
		'& > *': {
			transition: 'none',
			transform: 'rotate(45deg)',
		},
		'& .buffered-track': {
			position: 'absolute',
			backgroundColor: 'rgba(82, 175, 119, 0.5)',
			height: '100%',
			zIndex: -1,
		},
	},
})

export default PrettoSlider
