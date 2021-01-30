import React from 'react'

import User from '../../components/User'

const AuthIndexPage = (props) => (
    <div>
        <h1>The Auth Index Page from {props.appName}</h1>
        <User name="Max" age={28} />
    </div>
)

AuthIndexPage.getInitialProps = async (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ appName: 'Super App Auth' })
        }, 2000)
    })
    return await promise
}

export default AuthIndexPage