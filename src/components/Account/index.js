import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-bg">
      <Header />
      <div className="account-container">
        <h1 className="account-heading">Account</h1>
        <div className="account-details-container">
          <p className="account-sub-heading">Member ship</p>
          <div className="user-details-container">
            <p className="user-details-text">rahul@gmail.com</p>
            <p className="password-details">Password : **********</p>
          </div>
        </div>
        <hr className="h-line" />
        <div className="account-details-container">
          <p className="account-sub-heading">Plan details</p>
          <div className="plan-container">
            <p className="user-details-text">Premium</p>
            <p className="plan-type">Ultra HD</p>
          </div>
        </div>
        <hr className="h-line" />
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(Account)
