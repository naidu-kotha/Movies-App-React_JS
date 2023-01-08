import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  state = {menuClicked: false}

  onClickMenu = () => {
    this.setState(prevState => ({menuClicked: !prevState.menuClicked}))
  }

  render() {
    const {menuClicked} = this.state
    const menuClassName = menuClicked ? 'sm-menu-container' : 'no-popup'
    return (
      <nav className="nav-bar">
        <div className="nav-bar-header-container">
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
              <button
                type="button"
                className="header-btn"
                testid="searchButton"
              >
                <HiOutlineSearch className="header-icon" />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671881458/Movies%20App/Avatarprofile_lyxntc.jpg"
                alt="profile"
                className="profile-img"
              />
            </Link>
            <button
              className="header-menu-btn"
              type="button"
              onClick={this.onClickMenu}
            >
              <img
                src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1673089865/Movies%20App/add-to-queue_1_ac1xec.png"
                alt="header menu"
                className="header-icon"
              />
            </button>
          </div>
        </div>
        <div className={menuClassName}>
          <ul className="popup-menu-container">
            <Link to="/" className="header-link">
              <li className="sm-header-item">Home</li>
            </Link>
            <Link to="/popular" className="header-link">
              <li className="sm-header-item">Popular</li>
            </Link>
            <Link to="/account" className="header-link">
              <li className="sm-header-item">Account</li>
            </Link>
          </ul>
          <button type="button" className="close-button">
            <img
              src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1673114477/Movies%20App/Shape_bx1ekl.png"
              className="close-icon"
              alt="close"
              onClick={this.onClickMenu}
            />
          </button>
        </div>
      </nav>
    )
  }
}

export default Header
