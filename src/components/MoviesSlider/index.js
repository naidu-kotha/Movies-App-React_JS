import Slider from 'react-slick'
import {Link} from 'react-router-dom'

// import MovieItem from '../MovieItem'
import './index.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MoviesSlider = props => {
  const {moviesList} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 915,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {moviesList.map(eachMovie => {
        const {posterPath, title, id} = eachMovie
        return (
          <div className="slick-item" key={title}>
            <Link to={`/movies/${id}`}>
              <img src={posterPath} alt={title} className="movie-image" />
            </Link>
          </div>
        )
      })}
    </Slider>
  )
}

export default MoviesSlider
