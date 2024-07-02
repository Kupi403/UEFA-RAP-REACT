import './App.css'
import Container from '@mui/material/Container'

import Navbar from './Components/Navbar'
import Player from './Components/VideoPlayer/Player'


const App = () => {

	return (
		<>
			<Navbar />

			<div className='box'>
				<div className='main__section'>
					<Player />
				</div>
			</div>
		</>
	)
}

export default App
