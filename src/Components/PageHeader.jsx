import { useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { Link } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import './styles/PageHeader.scss'

const PageHeader = ({ link, spanText, titleText }) => {
	const { version } = useContext(AppContext)
	return (
		<div className='header'>
			<Link to={link}>
				<div className='header__link'>
					<ArrowBackIosNewIcon className='header__link--icon' />
					<span className='header__link--span'>{`${version} - `}{spanText} </span>
				</div>
			</Link>
			<h2 className='header__title'>{titleText}</h2>
		</div>
	)
}

export default PageHeader
