import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios({
        url: 'http://localhost:3001/admin/login',
        data: { email, password },
        method: 'POST'
      })
      localStorage.setItem('access_token', data.access_token)
      history.push('/')
      console.log(data.access_token)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <h1 className="text-center my-5">Sign In</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3 row justify-content-center">
          <div className="col-3">
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" className="form-control" placeholder="Email" />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-3">
            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" placeholder="Password" />
          </div>
        </div>
        <button className="btn btn-primary my-3" type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Login