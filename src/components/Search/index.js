import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    searchResultsArray: [],
    menuClicked: false,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getSearchResultsApi()
  }

  onClickMenu = () => {
    this.setState(prevState => ({menuClicked: !prevState.menuClicked}))
  }

  onClickEnterButton = event => {
    if (event.key === 'Enter') {
      this.getSearchResultsApi()
    }
  }

  getSearchResultsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)

      const searchResults = data.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      //   console.log(searchResults)
      this.setState({
        searchResultsArray: searchResults,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchResults = () => {
    const {searchResultsArray} = this.state
    if (searchResultsArray.length === 0) {
      return this.renderNoResultsView()
    }
    return (
      <ul className="search-results-list-container">
        {searchResultsArray.map(eachMovie => {
          const {id, title, posterPath} = eachMovie
          return (
            <li key={title}>
              <Link to={`/movies/${id}`}>
                <img
                  src={posterPath}
                  alt={title}
                  className="search-result-img"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderNoResultsView = () => {
    const {searchInput} = this.state
    return (
      <div className="no-results-container">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672915797/no_results_dfrdhe.png"
          className="no-results-img"
          alt="no movies"
        />
        <p className="no-movies-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="search-loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
    </div>
  )

  reloadPage = () => {
    this.getSearchResultsApi()
  }

  renderFailureView = () => (
    <div className="search-failure-container">
      <img
        src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672225767/Failure_view_fpucib.png"
        alt="failure view"
        className="search-failure-image"
      />
      <p className="search-failure-msg">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-retry-btn"
        onClick={this.reloadPage}
      >
        Try Again
      </button>
    </div>
  )

  renderHeader = () => {
    const {searchInput, menuClicked} = this.state
    const menuClassName = menuClicked
      ? 'search-sm-menu-container'
      : 'search-no-popup'
    return (
      <>
        <nav className="search-nav-bar">
          <div className="search-nav-items-container">
            <Link to="/" className="search-header-link">
              <img
                src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671795411/Movies%20App/Movies_Logo_iassdx.png"
                alt="website logo"
                className="search-header-logo"
              />
            </Link>
            <ul className="search-menu-container">
              <li className="search-menu-item">
                <Link to="/" className="search-header-link">
                  Home
                </Link>
              </li>
              <li className="search-menu-item">
                <Link to="/popular" className="search-header-link">
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-nav-items-container">
            <div className="search-container">
              <input
                type="search"
                className="search-bar"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onClickEnterButton}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchButton}
                testid="searchButton"
              >
                <HiOutlineSearch className="search-container-logo" />
              </button>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671881458/Movies%20App/Avatarprofile_lyxntc.jpg"
                alt="profile"
                className="search-profile-img"
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
        </nav>
        <div className={menuClassName}>
          <ul className="search-popup-menu-container">
            <Link to="/" className="search-header-link">
              <li className="search-sm-header-item">Home</li>
            </Link>
            <Link to="/popular" className="search-header-link">
              <li className="search-sm-header-item">Popular</li>
            </Link>
            <Link to="/account" className="search-header-link">
              <li className="search-sm-header-item">Account</li>
            </Link>
          </ul>
          <button type="button" className="search-close-button">
            <img
              src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1673114477/Movies%20App/Shape_bx1ekl.png"
              className="search-close-icon"
              alt="close"
              onClick={this.onClickMenu}
            />
          </button>
        </div>
      </>
    )
  }

  renderResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchResults()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-results-movie-container">
        {this.renderHeader()}
        {this.renderResults()}
      </div>
    )
  }
}

export default Search
