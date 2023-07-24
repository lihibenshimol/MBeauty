import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { adminService } from '../services/admin-service.js'
import { login, signup } from '../store/admin-action.js'

export function Login() {
  const [credentials, setCredentials] = useState(adminService.getEmptyCredentials())
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
    console.log('credentials = ', credentials)
      const admin = await login(credentials)
      showSuccessMsg(`Welcome ${admin.fullname}`)
      navigate('/store')
    } catch (err) {
      showErrorMsg('Oops try again')
    }
  }




  const { adminname, password, fullname } = credentials
  return (
    <div className='login-page'>
      <h1>כניסת מנהלים בלבד</h1>
      <form className='login-form' onSubmit={onSubmit}>
        <input
          type='text'
          name='adminname'
          value={adminname}
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

        <button>{isSignupState ? 'Signup' : 'Login'}</button>
      </form>

      {/* <div className='btns'>
        <a href='#' onClick={onToggleSignupState}>
          {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div> */}
    </div>
  )
}
