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
    apiStatus: apiStatusConstants.initial,
    randomOriginalsMovie: '',
    originalsMovieData: [],
  }

  componentDidMount() {
    this.getOriginalsApi()
  }

  getOriginalsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsApiUrl, options)
    console.log(response)
    if (response.ok) {
      const originalsData = await response.json()
      console.log(originalsData)
      const randomMovieDataIndex = Math.floor(
        Math.random() * originalsData.results.length,
      )
      console.log(randomMovieDataIndex)

      const updatedOriginalsData = originalsData.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))

      const randomOriginalsMovie = updatedOriginalsData[randomMovieDataIndex]
      console.log(randomOriginalsMovie)
      this.setState({
        randomOriginalsMovie,
        originalsMovieData: updatedOriginalsData,
      })
    }
  }

  render() {
    const {randomOriginalsMovie} = this.state
    const {overview, backdropPath, title} = randomOriginalsMovie
    return (
      <div
        className="home-bg"
        style={{backgroundImage: `{url(${backdropPath})}`}}
      >
        <Header />
      </div>
    )
  }
}

export default Home
