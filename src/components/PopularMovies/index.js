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

class PopularMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMoviesArray: []}

  componentDidMount() {
    this.getPopularMoviesApi()
  }

  getPopularMoviesApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMoviesArray: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="popular-movies-loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
    </div>
  )

  reloadPage = () => {
    this.getPopularMoviesApi()
  }

  renderFailureView = () => (
    <div className="popular-movies-failure-container">
      <img
        src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672225767/Failure_view_fpucib.png"
        alt="failure view"
        className="popular-movies-failure-image"
      />
      <p className="popular-movies-failure-msg">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-movies-retry-btn"
        onClick={this.reloadPage}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {popularMoviesArray} = this.state
    return (
      <ul className="popular-movies-container">
        {popularMoviesArray.map(eachMovie => {
          const {id, title, posterPath} = eachMovie
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                <img
                  src={posterPath}
                  alt={title}
                  className="popular-movie-img"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-bg">
        <Header />
        {this.renderPopularMovies()}
        <Footer />
      </div>
    )
  }
}

export default PopularMovies
