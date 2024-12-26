import React from 'react'
import styles from './Header.module.css'
import { useAuth } from '../../context/auth'

const Header = () => {
    const { logout, user } = useAuth()
    return (
        <div
            className={styles.container}>
            <div className={styles.logoContainer}>
                <p>Text Sharing</p>
                <p>Hi {user.name.slice(0, 10)}</p>
            </div>
            <div className={styles.rightContainer}>
                <button onClick={logout}>Logout</button>
            </div>

        </div>
    )
}

export default Header