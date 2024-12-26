import React from 'react'
import LoadingIcon from '../../assets/images/loadingIcon.gif'

const Loading = () => {
    return (
        <div style={{ position: 'absolute', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: '0.5' }}>
            <img src={LoadingIcon} alt="Loading" />
        </div>
    )
}

export default Loading