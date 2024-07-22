import { useContext } from 'react'
import { AppContext } from '../store/AppContext'
import './styles/Footer.scss'

const Footer = () => {
	const { translations } = useContext(AppContext)

	return (
		<footer className='footer'>
			<div className='footer__box'>
				<p className='footer__info'>{translations.footer.copyright}</p>
				<p className='footer__info'>
					{translations.footer.project}{' '}
					<a
						href='https://www.facebook.com/kupifb'
						target='_blank'>
						Michał Kupidura
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer
