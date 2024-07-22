import { useEffect, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import api from '../assets/app-clips.json'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../Components/PageHeader'
import setTitle from '../helpers/setDocumentTitle'
import './styles/CategoryClips.scss'

const CategoryClips = () => {
	const { category } = useParams()
	const { version, language, translations } = useContext(AppContext)
	const data = api[category.toUpperCase()]

	useEffect(() => {
		setTitle(version, api[category].category)
	}, [])

	if (!data) {
		throw new Error(language === 'pl' ? 'Nie znaleziono kategorii.' : 'Category not found.')
	}

	return (
		<div className='category-clips'>
			<PageHeader
				link={`/`}
				spanText='Menu'
				titleText={translations.home[category.toLowerCase()]}
			/>

			<div className='category-clips__container'>
				{data.content.map(clip => (
					<Link
						to={`${clip.id + 1}`}
						className='category-clips__clip'
						key={clip.id}>
						<div className='category-clips__clip--shadow'></div>
						<span>{`${category}${clip.id + 1}`}</span>
						<img
							src={clip.thumbnail}
							alt={`Miniaturka klipu ${category + (clip.id + 1)}`}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export default CategoryClips
