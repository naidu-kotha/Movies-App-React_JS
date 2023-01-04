import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  state = {searchClicked: false, searchInput: ''}

  toggleSearchContainer = () => {
    const {searchClicked} = this.state
    this.setState({searchClicked: !searchClicked})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchClicked, searchInput} = this.state
    const searchContainerClassName = searchClicked
      ? 'search-container'
      : 'hide-elements'
    const searchIconClassName = searchClicked ? 'hide-elements' : 'search-logo'

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
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <HiOutlineSearch className="search-container-logo" />
          </div>
          <button
            type="button"
            className="search-btn"
            testid="searchButton"
            onClick={this.toggleSearchContainer}
          >
            <HiOutlineSearch className={searchIconClassName} />
          </button>
          <img
            src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671881458/Movies%20App/Avatarprofile_lyxntc.jpg"
            alt="profile"
            className="profile-img"
          />
        </div>
      </nav>
    )
  }
}

export default Header
