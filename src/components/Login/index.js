import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', Pin: '', showMsgError: false, errorMsg: ''}

  onUserId = event => {
    this.setState({userId: event.target.value})
  }

  onUserPin = event => {
    this.setState({Pin: event.target.value})
  }

  getSuccessful = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showMsgError: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()

    const {userId, Pin} = this.state
    const userDetails = {user_id: userId, pin: Pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)

    if (response.ok === true) {
      this.getSuccessful(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, Pin, showMsgError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="card-bg">
          <div>
            <img
              className="login-img"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="form-login-bg">
            <h1 className="form-heading"> Welcome Back </h1>
            <form className="form-style" onSubmit={this.onLogin}>
              <label className="label-text" htmlFor="user">
                {' '}
                USER ID
              </label>
              <input
                className="input-bg"
                type="text"
                placeholder="Enter User ID"
                id="user"
                value={userId}
                onChange={this.onUserId}
              />
              <label className="label-text" htmlFor="pin">
                {' '}
                PIN
              </label>
              <input
                className="input-bg"
                type="password"
                placeholder="Enter PIN"
                id="pin"
                value={Pin}
                onChange={this.onUserPin}
              />
              <button className="login-btn" type="submit">
                {' '}
                Login{' '}
              </button>
              {showMsgError && <p className="error-msg"> {errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
