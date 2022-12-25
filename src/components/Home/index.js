import {Component} from 'react'
import Cookies from 'js-cookie'
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
      //   console.log(originalsData)
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
      //   console.log(randomOriginalsMovie)
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
      //   console.log(data)
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

  renderFailurePoster = () => (
    <div className="failure-poster-container">
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderPoster = () => {
    const {originalMoviesApiStatus} = this.state

    switch (originalMoviesApiStatus) {
      case apiStatusConstants.success:
        return this.renderTopCard()
      //   case apiStatusConstants.failure:
      //     return this.renderFailurePoster()
      //   case apiStatusConstants.inProgress:
      //     return this.renderLoadingView()
      default:
        return null
    }
  }

  //   renderOriginalMovies = () => {
  //       const {originalMoviesApiStatus} = this.state

  //     switch (originalMoviesApiStatus) {
  //       case apiStatusConstants.success:
  //         return this.
  //       case apiStatusConstants.failure:
  //         return this.renderFailureView()
  //       case apiStatusConstants.inProgress:
  //         return this.renderLoadingView()
  //       default:
  //         return null
  //     }
  //   }

  //   renderTrendingMovies = () => {
  //       const {trendingMoviesApiStatus} = this.state

  //     switch (originalMoviesApiStatus) {
  //       case apiStatusConstants.success:
  //         return this.
  //       case apiStatusConstants.failure:
  //         return this.renderFailureView()
  //       case apiStatusConstants.inProgress:
  //         return this.renderLoadingView()
  //       default:
  //         return null
  //     }
  //   }

  renderTopCard = () => {
    const {randomOriginalsMovie} = this.state
    const {overview, backdropPath, title} = randomOriginalsMovie
    return (
      <div
        className="home-top-bg"
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

  render() {
    return (
      <>
        {this.renderPoster()}
        {/* {this.renderTrendingMovies()} */}
        {/* {this.renderOriginalMovies()} */}
      </>
    )
  }
}

export default Home
