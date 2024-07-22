import { useContext, useEffect } from 'react'
import { AppContext } from '../store/AppContext'
import { useRouteError } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import setDocumentTitle from '../helpers/setDocumentTitle'
import './styles/Error.scss'

function ErrorPage() {
	const { language } = useContext(AppContext)
	const error = useRouteError()

	let title = language === 'pl' ? 'Wystąpił błąd' : 'An error occured'
	let message = language === 'pl' ? 'Coś poszło nie tak...' : 'Something went wrong...'

	useEffect(() => {
		setDocumentTitle('',title)
	}, [])

	return (
		<>
			<Navbar />
			<div className='error wrapper'>
				<h2 className='error__title'>{error.title || title}</h2>
				<p className='error__message'>{error.message || message}</p>
				<a
					className='error__link'
					href='/'>
					{language === 'pl' ? 'Powrót na stronę główną' : 'Return to home page'}
				</a>
			</div>
			<Footer />
		</>
	)
}

export default ErrorPage
