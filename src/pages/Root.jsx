import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { AppContext } from '../store/AppContext'
import { useContext, useEffect } from 'react'
import euro24Background from '../assets/euro-bgc.jpg'
import standardBackground from '../assets/background-menu.png'

const Root = () => {
	const { version } = useContext(AppContext)

	useEffect(() => {
		document.body.style.backgroundImage = `url(${version == 'EURO 2024' ? euro24Background : standardBackground})`
		;('none')
		document.body.style.backgroundSize = 'cover'
		document.body.style.backgroundPosition = 'center'

		return () => {
			document.body.style.backgroundImage = `url(${standardBackground})`
		}
	}, [version])

	return (
		<>
			<Navbar />
			<main className='wrapper'>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Root
