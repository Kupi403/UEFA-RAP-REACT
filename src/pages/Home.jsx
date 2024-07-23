import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { Link } from 'react-router-dom'
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

	const { translations, version, api } = useContext(AppContext)

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

	const decisionMarks = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
	const managementMarks = ['H', 'I', 'J', 'K']
	const otherMarks = ['L', 'M', 'N', 'O', 'P']

	const decisionClips = Object.entries(api).filter(entry => decisionMarks.includes(entry[0]))
	const managementClips = Object.entries(api).filter(entry => managementMarks.includes(entry[0]))

	const otherCategories = Object.entries(api).filter(entry => otherMarks.includes(entry[0]))

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

			{otherCategories.map(category => (
				<Link
					to={`clips/${category[0]}`}
					key={category[0]}>
					<AccordionButton className='home__item'>
						<div className='home__description-box'>
							<p className='home__letter'>{category[0]}</p>
							<p className='home__title'>{`${category[1].category} (${category[1].letter + 1} - ${
								category[1].letter + category[1].content.length
							})`}</p>
						</div>
					</AccordionButton>
				</Link>
			))}
		</div>
	)
}

export default Home
