import React from 'react'
import './Navbar.scss'

const Navbar = () => {
	return (
		<nav className='navbar'>
			<a href="#" className='navbar__logo'>
				<span className='navbar__logo-title'>UEFA CLIPS</span>
        <span>2023:2</span>
			</a>
      <div className="navbar__links">
        <a href="#">Klipy</a>
        <a href="#">Video test</a>
        <a href="#">Ustawienia</a>
      </div>
		</nav>
	)
}

export default Navbar
