import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
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
  }

  componentDidMount() {
    this.getSearchResultsApi()
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
            <Link to={`/movies/${id}`}>
              <li key={title}>
                <img
                  src={posterPath}
                  alt={title}
                  className="search-result-img"
                />
              </li>
            </Link>
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

  onChangeSearchInput = input => {
    this.setState({searchInput: input})
  }

  onClickSearchButton = () => {
    this.getSearchResultsApi()
  }

  onClickEnterButton = () => {
    this.getSearchResultsApi()
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
        <Header
          changeSearchInput={this.onChangeSearchInput}
          searchIconClicked="true"
          onClickSearchButton={this.onClickSearchButton}
          enterClicked={this.onClickEnterButton}
        />
        {this.renderResults()}
        <Footer className="footer-container" />
      </div>
    )
  }
}

export default Search