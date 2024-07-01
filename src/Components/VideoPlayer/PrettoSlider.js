import { styled } from '@mui/material/styles'
import {Slider} from '@mui/material'
 
 const PrettoSlider = styled(Slider)({
		color: '#52af77',
		height: 8,
		transition:'none',
		'& .MuiSlider-track': {
			border: 'none',
			transition:'none',
		},
		'& .MuiSlider-thumb': {
			height: 9,
			width: 15,
			borderRadius: '0',
			backgroundColor: '#fff',
			transition:'none',
			border: '2px solid currentColor',
			'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
				boxShadow: 'inherit',
			},
			'&::before': {
				display: 'none',
			},
		},
		'& .MuiSlider-valueLabel': {
			transition:'none',
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
				transition:'none',
				transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
			},
			'& > *': {
				transition:'none',
				transform: 'rotate(45deg)',
			},
		},
	})


	// const CustomSlider = styled(Slider)(({ theme }) => ({
	// 	color: 'blue', //color of the slider between thumbs
	// 	'& .MuiSlider-thumb': {
	// 		backgroundColor: 'green', //color of thumbs
	// 	},
	// 	'& .MuiSlider-rail': {
	// 		color: 'lime', ////color of the slider outside  teh area between thumbs
	// 	},
	// }))


    export default PrettoSlider