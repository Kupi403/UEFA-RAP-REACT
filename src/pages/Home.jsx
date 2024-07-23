import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { Link } from 'react-router-dom'
import api from '../assets/app-clips.json'
import ExpandedElements from './ExpandedElements'
import setDocumentTitle from '../helpers/setDocumentTitle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import './styles/Home.scss'

const Home = () => {
	let radiusPropsOpened = '10px 10px 0 0'
	let radiusPropsClosed = '10px'
	const [isAccordionOpen, setIsAccordionOpen] = useState({ 0: false, 1: false })

	const { translations, version } = useContext(AppContext)

	useEffect(() => {
		setDocumentTitle(version, 'Menu')
	}, [])

	const AccordionButton = styled(Button)({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1em',
		margin: '.5em 0 0 0',
		width: '100%',
		borderRadius: '10px',
		backgroundColor: '#0A142E',
		color: 'white',
		':hover': {
			backgroundColor: '#050a16',
		},
	})

	const decisionClips = Object.entries(api).slice(1, 8)
	const managementClips = Object.entries(api).slice(8, 11)

	const handleOpenAccordion = id => {
		setIsAccordionOpen({ ...isAccordionOpen, [id]: !isAccordionOpen[id] })
	}

	return (
		<div className='home'>
			<AccordionButton
				style={isAccordionOpen[0] ? { borderRadius: radiusPropsOpened } : { borderRadius: radiusPropsClosed }}
				className='home__item home__item--expandable'
				onClick={() => handleOpenAccordion(0)}>
				<div className='home__description-box'>
					<p className='home__letter'>a-g</p>
					<p className='home__title'>{translations.home.expandedBar1.title}</p>
				</div>
				<span className='home__chevron'>
					<ExpandMoreIcon
						style={isAccordionOpen[0] ? { color: 'gray', transform: 'rotate(180deg)' } : { color: 'white' }}
						size='large'
					/>
				</span>
			</AccordionButton>
			{isAccordionOpen[0] && (
				<div className='home__expanded-box'>
					<ExpandedElements elements={decisionClips} />
				</div>
			)}

			<AccordionButton
				className='home__item home__item--expandable'
				style={isAccordionOpen[1] ? { borderRadius: radiusPropsOpened } : { borderRadius: radiusPropsClosed }}
				onClick={() => handleOpenAccordion(1)}>
				<div className='home__description-box'>
					<p className='home__letter'>h-k</p>
					<p className='home__title'>{translations.home.expandedBar2.title}</p>
				</div>
				<span className='home__chevron'>
					<ExpandMoreIcon
						style={isAccordionOpen[1] ? { color: 'gray', transform: 'rotate(180deg)' } : { color: 'white' }}
						size='large'
					/>
				</span>
			</AccordionButton>
			{isAccordionOpen[1] && (
				<div className={'home__expanded-box'}>
					<ExpandedElements elements={managementClips} />
				</div>
			)}

			<Link to={'clips/L'}>
				<AccordionButton className='home__item'>
					<div className='home__description-box'>
						<p className='home__letter'>l</p>
						<p className='home__title'>{translations.home.l}</p>
					</div>
				</AccordionButton>
			</Link>
			<Link to={'clips/M'}>
				<AccordionButton className='home__item'>
					<div className='home__description-box'>
						<p className='home__letter'>m</p>
						<p className='home__title'>{translations.home.m}</p>
					</div>
				</AccordionButton>
			</Link>
			<Link to={'clips/N'}>
				<AccordionButton className='home__item'>
					<div className='home__description-box'>
						<p className='home__letter'>n</p>
						<p className='home__title'>{translations.home.n}</p>
					</div>
				</AccordionButton>
			</Link>
		</div>
	)
}

export default Home
