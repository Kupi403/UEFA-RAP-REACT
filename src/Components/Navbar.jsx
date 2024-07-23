import { useState, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { NavLink } from 'react-router-dom'
import NavLinks from './NavLinks'
import { Divide as Hamburger } from 'hamburger-react'
import './styles/Navbar.scss'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const { version } = useContext(AppContext)

	return (
		<nav className='navbar'>
			<div className='navbar__nav'>
				<NavLink
					to='/'
					className='navbar__logo'>
					<span className='navbar__logo-title'>UEFA RAP</span>
					<span className='navbar__logo-title--year'>{version}</span>
				</NavLink>
				<div className='navbar__links navbar__links--desktop'>
					<NavLinks onToggleMenu={setIsMenuOpen} />
				</div>

				<Hamburger
					className='navbar__hamburger'
					rounded
					color='white'
					label='Menu'
					hideOutline={false}
					toggled={isMenuOpen}
					toggle={setIsMenuOpen}
				/>

				{isMenuOpen && (
					<div className='navbar__links navbar__links--mobile'>
						<NavLinks onToggleMenu={setIsMenuOpen} />
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
