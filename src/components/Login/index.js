import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      //   console.log(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <img
          src="https://res.cloudinary.com/dck3ikgrn/image/upload/v1671795411/Movies%20App/Movies_Logo_iassdx.png"
          alt="login website logo"
          className="netflix-logo"
        />
        <form className="login-card" onSubmit={this.submitForm}>
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label htmlFor="user" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              id="user"
              className="input-box"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="pwd" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              id="pwd"
              className="input-box"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
