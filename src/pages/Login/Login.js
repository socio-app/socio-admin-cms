import React, { useState, useEffect } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import Logo from '../../components/sociologo1.png'
import { LoginAdmin } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.isLogin)

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [history])

  useEffect(() => {
    if (isLogin) {
      history.push('/')
    }
  }, [isLogin, history])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(LoginAdmin({email, password}))
    // history.push('/')
    // try {
    //   const { data } = await axios({
    //     url: 'http://localhost:3001/admin/login',
    //     data: { email, password },
    //     method: 'POST',
    //   })
    //   localStorage.setItem('access_token', data.access_token)
    //   history.push('/')
    //   console.log(data.access_token)
    // } catch (err) {
    //   console.log(err)
    // }
  }
  return (
    <div className="body-background-image">
      <div class="container h-100">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                <img src={Logo} class="brand_logo" alt="Logo" />
              </div>
            </div>
            <div class="d-flex justify-content-center form_container">
              <form onSubmit={(event) => handleSubmit(event)}>
                <div class="input-group mb-3">
                  <h3> ADMIN ONLY !!!</h3>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-append"></div>

                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append"></div>
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group"></div>
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" name="button" class="btn login_btn">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
