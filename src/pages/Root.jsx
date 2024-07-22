import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Root = () => {
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
