import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user-service.js'
import { login, signup } from '../store/user-action.js'
import { UserMsg } from './user-msg.jsx'

export function Login() {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)
  const navigate = useNavigate()

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }


  async function onSubmit(ev) {
    ev.preventDefault()
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome ${user.fullname}`)
      navigate('/store')
    } catch (err) {
      showErrorMsg('Oops try again')
    }
  }




  const { username, password, fullname } = credentials
  return (
    <div className='login-page'>
      <h1>כניסת מנהלים בלבד</h1>
      <form className='login-form' onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          value={username}
          placeholder='Username'
          onChange={handleCredentialsChange}
          required
          autoFocus
        />

        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={handleCredentialsChange}
          required
        />

        {isSignupState && (
          <input
            type='text'
            name='fullname'
            value={fullname}
            placeholder='Full name'
            onChange={handleCredentialsChange}
            required
          />
        )}

        <button>Login</button>
      </form>

      <UserMsg />
    </div>
  )
}
