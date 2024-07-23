import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../store/AppContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import { Language, Slideshow, ArrowDropDown, History } from '@mui/icons-material'
import plIcon from '../assets/poland-flag-icon-16.png'
import enIcon from '../assets/united-kingdom-flag-icon-16.png'

const NavLinks = ({ onToggleMenu }) => {
	const { versions, setVersion, setLanguage } = useContext(AppContext)
	const [versionAnchor, setVersionAnchor] = useState(null)
	const [languageAnchor, setLanguageAnchor] = useState(null)

	const navigate = useNavigate()

	const { translations } = useContext(AppContext)
	useEffect(() => {
		const handleClickOutside = event => {
			if (versionAnchor && !versionAnchor.contains(event.target)) {
				setVersionAnchor(null)
			}
			if (languageAnchor && !languageAnchor.contains(event.target)) {
				setLanguageAnchor(null)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [versionAnchor, languageAnchor])

	const handleMenuOpen = (event, type) => {
		if (type === 'version') {
			setLanguageAnchor(null)
			setVersionAnchor(event.currentTarget)
		} else {
			setVersionAnchor(null)
			setLanguageAnchor(event.currentTarget)
		}
	}

	const handleMenuClose = type => {
		type === 'version' ? setVersionAnchor(null) : setLanguageAnchor(null)
	}

	const handleLanguageChange = language => {
		onToggleMenu(false)
		setLanguage(language)
		handleMenuClose('language')
	}

	const handleVersionChange = version => {
		onToggleMenu(false)
		navigate('/')
		setVersion(version)
		handleMenuClose('version')
	}

	return (
		<>
			<IconButton
				edge='end'
				color='inherit'
				style={{ borderRadius: '8px', fontSize: 'inherit' }}
				aria-label='language'>
				<Slideshow />
				<NavLink to='/clips'>
					<span style={{ marginLeft: '8px' }}>{translations.navbar.clips}</span>
				</NavLink>
			</IconButton>

			{/* <div className='link__box'> */}
			<Box>
				<IconButton
					edge='end'
					color='inherit'
					style={{ borderRadius: '8px', fontSize: 'inherit' }}
					aria-label='language'
					onClick={e => handleMenuOpen(e, 'version')}>
					<History />
					<span style={{ marginLeft: '8px' }}>{translations.navbar.version}</span>
					<ArrowDropDown />
				</IconButton>
				<Menu
					anchorEl={versionAnchor}
					open={Boolean(versionAnchor)}
					onClose={() => handleMenuClose('version')}>
					{versions.map(version => (
						<MenuItem
							key={version}
							onClick={() => handleVersionChange(version)}>
							{version}
						</MenuItem>
					))}
				</Menu>
			</Box>
			<Box>
				<IconButton
					edge='end'
					color='inherit'
					style={{ borderRadius: '8px', fontSize: 'inherit' }}
					aria-label='language'
					onClick={e => handleMenuOpen(e, 'language')}>
					<Language />
					<span style={{ marginLeft: '8px' }}>{translations.navbar.language}</span>
					<ArrowDropDown style={languageAnchor ? { transform: 'rotate(180deg)' } : {}} />
				</IconButton>
				<Menu
					anchorEl={languageAnchor}
					open={Boolean(languageAnchor)}
					onClose={() => handleMenuClose('language')}>
					<MenuItem onClick={() => handleLanguageChange('pl')}>
						<img
							src={plIcon}
							alt='Polish flag icon'
						/>
						Polski
					</MenuItem>
					<MenuItem onClick={() => handleLanguageChange('en')}>
						<img
							src={enIcon}
							alt='UK flag icon'
						/>
						English
					</MenuItem>
				</Menu>
			</Box>
		</>
	)
}

export default NavLinks
