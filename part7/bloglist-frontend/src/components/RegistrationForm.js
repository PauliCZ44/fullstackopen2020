import React,  { useState }  from 'react'
import { useDispatch } from 'react-redux'
import { makeAndRemoveMessage } from '../reducers/NotificationReducer'

const RegistrationForm = (props) => {
  const dispatch = useDispatch()
  /* VALIDATOIN */
  const [isNotFilled, setIsNotFilled] = useState([false, false, false, false])

  let styleFilledUser = isNotFilled[0]
    ? 'form-control notFilledForm'
    : 'form-control'
  let styleFilledName = isNotFilled[1]
    ? 'form-control notFilledForm'
    : 'form-control'
  let styleFilledPass = isNotFilled[2]
    ? 'form-control notFilledForm'
    : 'form-control'
  let styleFilledPassConf = isNotFilled[3]
    ? 'form-control notFilledForm'
    : 'form-control'

  const registerUser = async (e) => {
    e.preventDefault()
    if (props.username === '') {
      dispatch(makeAndRemoveMessage('Please fill in your username', 5, true))
      return setIsNotFilled([true, false, false, false])
    }
    else if (props.name === '') {
      dispatch(makeAndRemoveMessage('Please fill in your full name', 5, true))
      return setIsNotFilled([false, true, false, false])
    }
    else if (props.password === '') {
      dispatch(makeAndRemoveMessage('Please fill in your full password', 5, true))
      return setIsNotFilled([false, false, true, false])
    }
    else if (props.passwordConfirm === '') {
      dispatch(makeAndRemoveMessage('Please fill in your full password  password for confirmation', 5, true))
      return setIsNotFilled([false, false, false, true])
    }
    else if (props.passwordConfirm !== props.password) {
      dispatch(makeAndRemoveMessage('Passwords had to be equal', 5, true))
      return setIsNotFilled([false, false, true, true])
    }
    /* VALIDATOIN  END*/
    const userObject = {
      username: props.username,
      name: props.name,
      password: props.password,
    }
    try {
      let res = await props.registerService(userObject)
      if (res) {
        dispatch(makeAndRemoveMessage(`${props.name}, you were registed in as "${props.username}"`, 5))
        props.setUsername('')
        props.setName('')
        props.setPassword('')
        props.setPasswordConfirm('')
        setIsNotFilled([false, false, false, false])
        console.log('response after create:', res)
      }
    } catch (error) {
      dispatch(makeAndRemoveMessage(`${props.name}, you were registed in as "${props.username}"`, 5, true))
      console.log('error::', error)
    }
  }

  return (
    <div className="card px-sm-4 mt-2 login-card hv-center shadow">
      <form className="p-2">
        <div className="form-group text-left mt-3">
          <label className="font-weight-bold">Username for login</label>
          <input type="text"
            value={props.username}
            className={styleFilledUser}
            id="username"
            placeholder="Enter your username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div className="form-group text-left mt-3">
          <label className="font-weight-bold">Name</label>
          <input type="text"
            value={props.name}
            className={styleFilledName}
            id="name"
            placeholder="Enter your name"
            onChange={({ target }) => props.setName(target.value)}
          />
        </div>
        <div className="form-group text-left mt-4">
          <label className="font-weight-bold">Password</label>
          <input type="password"
            className={styleFilledPass}
            id="password"
            placeholder="Password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <div className="form-group text-left mt-4">
          <label className="font-weight-bold">Confirm your password</label>
          <input type="password"
            className={styleFilledPassConf}
            id="passwordConfirm"
            placeholder="Confirm your password"
            value={props.passwordConfirm}
            onChange={({ target }) => props.setPasswordConfirm(target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-block btn-dark my-5 px-5 py-3 submitBtn"
          onClick = { registerUser } >
          CREATE NEW ACCOUNT
        </button>
        <div className="d-flex justify-content-between align-items-center">
          <p className = 'my-2'> Already have an account?</p>
          <button
            className = "btn btn-info my-2 px-5 save-btn"
            type = "button"
            onClick={props.switchToRegister} >
            Log in here
          </button>
        </div>
      </form>
    </div>
  )

}

export default RegistrationForm