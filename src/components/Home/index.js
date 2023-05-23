import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-bg">
      <div className="nav-bar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logout-btn" type="button" onClick={onLogout}>
          {' '}
          Logout{' '}
        </button>
      </div>
      <Link className="link-dec" to="/">
        <div className="card-cont">
          <h1 className="home-heading"> Your Flexibility, Our Excellence </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </Link>
    </div>
  )
}

export default Home
