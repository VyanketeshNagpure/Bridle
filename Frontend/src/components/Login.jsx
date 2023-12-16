import React from 'react'
import '../Styles/login.css'

function Login() {
  return (
    <div className='loginContainer'>
        <div>Bridle</div>
        <h3 className="divider-line" contenteditable>------- OR 1px --------</h3>
        <div className='loginCard'>
            <input className='emailInputField' placeholder='example@gmail.com'/>
            <button className='signInButton'>Sign In</button>
        </div>
    </div>
  )
}

export default Login