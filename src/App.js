import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import MovieItem from './components/MovieItem'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItem} />
  </Switch>
)
export default App
