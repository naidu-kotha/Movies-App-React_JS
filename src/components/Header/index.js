import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const Header = props => {
  const {
    changeSearchInput,
    onClickSearchButton,
    enterClicked,
    searchIconClicked,
  } = props

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const onClickSearchIcon = () => {
    onClickSearchButton()
  }

  const onClickEnter = event => {
    if (event.key === 'Enter') {
      enterClicked()
    }
  }

  const searchContainerClassName = searchIconClicked
    ? 'search-container'
    : 'hide-elements'
  const searchIconClassName = searchIconClicked
    ? 'hide-elements'
    : 'search-logo'

  return (
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
        <div className={searchContainerClassName}>
          <input
            type="search"
            className="search-bar"
            onChange={onChangeSearchInput}
            onKeyDown={onClickEnter}
          />
          <button
            type="button"
            className="search-btn"
            testid="searchButton"
            onClick={onClickSearchIcon}
          >
            <HiOutlineSearch className="search-container-logo" />
          </button>
        </div>
        <Link to="/search">
          <HiOutlineSearch className={searchIconClassName} />
        </Link>
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671881458/Movies%20App/Avatarprofile_lyxntc.jpg"
          alt="profile"
          className="profile-img"
        />
      </div>
    </nav>
  )
}

export default withRouter(Header)
