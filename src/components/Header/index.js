import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const Header = () => (
  <nav className="nav-bar">
    <div className="nav-items-container">
      <Link to="/" className="header-link">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671795411/Movies%20App/Movies_Logo_iassdx.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="menu-container">
        <li className="menu-item">
          <Link to="/" className="header-link">
            Home
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/popular" className="header-link">
            Popular
          </Link>
        </li>
      </ul>
    </div>
    <div className="nav-items-container">
      <Link to="/search">
        <button type="button" className="search-btn" testid="searchButton">
          <HiOutlineSearch className="search-logo" />
        </button>
      </Link>
      <Link to="/account">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671881458/Movies%20App/Avatarprofile_lyxntc.jpg"
          alt="profile"
          className="profile-img"
        />
      </Link>
    </div>
  </nav>
)

export default Header
