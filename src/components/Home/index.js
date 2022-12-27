import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import MoviesSlider from '../MoviesSlider'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalMoviesApiStatus: apiStatusConstants.initial,
    trendingMoviesApiStatus: apiStatusConstants.initial,
    randomOriginalsMovie: '',
    originalMoviesArray: [],
    trendingMoviesArray: [],
  }

  componentDidMount() {
    this.getOriginalsApi()
    this.getTrendingMoviesApi()
  }

  getOriginalsApi = async () => {
    this.setState({originalMoviesApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsApiUrl, options)
    // console.log(response)
    if (response.ok) {
      const originalsData = await response.json()
      console.log(originalsData)
      const randomMovieDataIndex = Math.floor(
        Math.random() * originalsData.results.length,
      )
      //   console.log(randomMovieDataIndex)

      const updatedOriginalsData = originalsData.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))

      const randomOriginalsMovie = updatedOriginalsData[randomMovieDataIndex]
      // console.log(randomOriginalsMovie)
      this.setState({
        randomOriginalsMovie,
        originalMoviesArray: updatedOriginalsData,
        originalMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalMoviesApiStatus: apiStatusConstants.failure})
    }
  }

  getTrendingMoviesApi = async () => {
    this.setState({trendingMoviesApiStatus: apiStatusConstants.inProgress})
    const trendingMoviesUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingMoviesUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const trendingMoviesArray = data.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      this.setState({
        trendingMoviesArray,
        trendingMoviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingMoviesApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingPoster = () => (
    <>
      <Header />
      <div className="loader-container-poster" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
      </div>
    </>
  )

  renderFailurePoster = () => (
    <>
      <Header />
      <div className="top-failure-poster-container">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672075017/alert_triangle_qovcjb.png"
          alt="failure view"
          className="failure-poster"
        />
        <p className="failure-msg">Something went wrong. Please try again</p>
        <button type="button" className="retry-btn">
          Try Again
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <>
      {/* <Header /> */}
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      {/* <Header /> */}
      <div className="failure-poster-container">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672075017/alert_triangle_qovcjb.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-msg">Something went wrong. Please try again</p>
        <button type="button" className="retry-btn">
          Try Again
        </button>
      </div>
    </>
  )

  renderTopCard = () => {
    const {randomOriginalsMovie} = this.state
    const {overview, backdropPath, title} = randomOriginalsMovie
    return (
      <div
        className="home-success-bg"
        style={{backgroundImage: `url(${backdropPath})`}}
      >
        <Header />
        <div className="poster-details-container">
          <h1 className="poster-title">{title}</h1>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="poster-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPoster = () => {
    const {originalMoviesApiStatus} = this.state

    switch (originalMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderTopCard()
      case apiStatusConstants.failure:
        return this.renderFailurePoster()
      case apiStatusConstants.inProgress:
        return this.renderLoadingPoster()
      default:
        return null
    }
  }

  renderTrendingNowMoviesCarousel = () => {
    const {trendingMoviesArray} = this.state
    return <MoviesSlider moviesList={trendingMoviesArray} />
  }

  renderOriginalMoviesCarousel = () => {
    const {originalMoviesArray} = this.state
    return <MoviesSlider moviesList={originalMoviesArray} />
  }

  renderOriginalMovies = () => {
    const {originalMoviesApiStatus} = this.state

    switch (originalMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalMoviesCarousel()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTrendingMovies = () => {
    const {trendingMoviesApiStatus} = this.state

    switch (trendingMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingNowMoviesCarousel()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFooter = () => (
    <div className="footer-container">
      <div>
        <FaGoogle className="footer-icon" />
        <FaTwitter className="footer-icon" />
        <FaInstagram className="footer-icon" />
        <FaYoutube className="footer-icon" />
      </div>
      <p className="footer-text">Contact Us</p>
    </div>
  )

  render() {
    return (
      <>
        <div className="home-top-bg">{this.renderPoster()}</div>
        <div className="home-bottom-card">
          <div className="movies-container">
            <h1 className="movie-type-heading">Trending Now</h1>
            <div className="slick-container">{this.renderTrendingMovies()}</div>
          </div>
          <div className="movies-container">
            <h1 className="movie-type-heading">Originals</h1>
            <div className="slick-container">{this.renderOriginalMovies()}</div>
          </div>
          {this.renderFooter()}
        </div>
      </>
    )
  }
}

export default Home
