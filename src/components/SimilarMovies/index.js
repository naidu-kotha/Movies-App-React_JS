import './index.css'

const similarMovies = props => {
  const {similarMovieDetails} = props
  const updatedData = {
    id: similarMovieDetails.id,
    posterPath: similarMovieDetails.poster_path,
    title: similarMovieDetails.title,
  }
  const {id, posterPath, title} = updatedData

  //   console.log(posterPath)

  return (
    <li key={id}>
      <img src={posterPath} alt={title} className="similar-movie-img" />
    </li>
  )
}

export default similarMovies
