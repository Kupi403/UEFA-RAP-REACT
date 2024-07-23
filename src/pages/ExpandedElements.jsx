import { useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
const ExpandedElements = ({ elements }) => {
	const ExpandedElementButton = styled(Button)({
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		color: 'white',
		padding: '1em',

		width: '100%',
		background: 'linear-gradient(319deg, rgba(18, 46, 120, 1) 0%, rgba(34, 68, 158, 1) 100%)',
	})


	const { translations } = useContext(AppContext)

	return elements.map((element, id) => {
		return (
			<Link
				className='home__expanded-item'
				to={`clips/${element[1].letter}`}
				key={element[1].letter}>
				<ExpandedElementButton>
					<p className='home__expanded-item--title'>{translations.home[elements[id][0].toLowerCase()]}</p>
					<p className='home__expanded-item--amount'>{`(${element[1].letter}1-${element[1].content.length})`}</p>
				</ExpandedElementButton>
			</Link>
		)
	})
}

export default ExpandedElements
