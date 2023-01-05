import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import MovieItem from './components/MovieItem'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItem} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
