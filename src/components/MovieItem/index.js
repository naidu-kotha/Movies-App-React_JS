import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {getYear, format, intervalToDuration} from 'date-fns'

import Header from '../Header'
import Footer from '../Footer'
import SimilarMovies from '../SimilarMovies'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieDetails: {}}

  componentDidMount() {
    this.getMovieDetailsApi()
  }

  getMovieDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const movieData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies,
        spokenLanguages: data.movie_details.spoken_languages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      console.log(movieData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails: movieData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  reloadPage = () => {
    this.getMovieDetailsApi()
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="movie-details-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="movie-details-failure-container">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1672225767/Failure_view_fpucib.png"
          alt="failure view"
          className="movie-details-failure-image"
        />
        <p className="movie-details-failure-msg">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="movie-details-retry-btn"
          onClick={this.reloadPage}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {movieDetails} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      //   id,
      overview,
      //   posterPath,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieDetails

    const year = getYear(new Date(releaseDate))
    // console.log(year)

    const time = intervalToDuration({
      start: new Date(0, 0, 0, 0, 0, 0),
      end: new Date(0, 0, 0, 0, runtime, 0),
    })
    // console.log(time)

    const updatedReleaseDate = format(new Date(releaseDate), 'do LLLL y')
    // console.log(updatedReleaseDate)

    return (
      <>
        <div
          className="movie-details-success-container"
          style={{
            background: `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #181818 92.82%,
    #181818 98.68%,
    #181818 108.61%
  ),url(${backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="movie-details-container">
            <h1 className="movie-details-heading">{title}</h1>
            <div className="timeline-certification-container">
              <p className="timeline">{`${time.hours}h ${time.minutes}m`}</p>
              {adult ? (
                <p className="certification">A</p>
              ) : (
                <p className="certification">U/A</p>
              )}
              <p className="timeline">{year}</p>
            </div>
            <p className="movie-details-overview">{overview}</p>
            <button type="button" className="movie-details-play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-details-info-container">
          <div className="info-container">
            <h1 className="info-heading">Genres</h1>
            {genres.map(eachGenre => (
              <p className="info-details" key={eachGenre.id}>
                {eachGenre.name}
              </p>
            ))}
          </div>
          <div className="info-container">
            <h1 className="info-heading">Audio Available</h1>
            {spokenLanguages.map(eachLanguage => (
              <p className="info-details" key={eachLanguage.id}>
                {eachLanguage.english_name}
              </p>
            ))}
          </div>
          <div>
            <div className="info-container">
              <h1 className="info-heading">Rating Count</h1>
              <p className="info-details">{voteCount}</p>
            </div>
            <div className="info-container">
              <h1 className="info-heading">Rating Average</h1>
              <p className="info-details">{voteAverage}</p>
            </div>
          </div>
          <div>
            <div className="info-container">
              <h1 className="info-heading">Budget</h1>
              <p className="info-details">{budget}</p>
            </div>
            <div className="info-container">
              <h1 className="info-heading">Release Date</h1>
              <p className="info-details">{updatedReleaseDate}</p>
            </div>
          </div>
        </div>
        <div className="more-movies-container">
          <h1 className="more-movies-heading">More like this</h1>
          <ul className="movies-list-container">
            {similarMovies.map(eachMovie => (
              <SimilarMovies
                key={eachMovie.id}
                similarMovieDetails={eachMovie}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderMoviesData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
      <div className="movie-details-bg">
        {this.renderMoviesData()}
        <Footer />
      </div>
    )
  }
}

export default MovieItem
