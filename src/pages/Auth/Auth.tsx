import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Auth.module.css'

const Auth = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <p>{login ? 'Login Form' : 'Signup Form'}</p>
        <div className={styles.toggleContainer}>
          <div className={`${styles.buttonToggle} ${login && styles.active_buttonToggle}`}
            onClick={() => { setLogin(true) }}
          >Login</div>
          <div className={`${styles.buttonToggle} ${!login && styles.active_buttonToggle}`}
            onClick={() => { setLogin(false) }}
          >Signup</div>
        </div>
        {login ?
          <LoginForm /> : <SignupForm setLogin={setLogin}/>
        }
      </div>
    </div>
  )
}

export default Auth