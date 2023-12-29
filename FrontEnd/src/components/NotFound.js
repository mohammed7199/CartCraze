import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = (props) => {
    let location = useLocation()
    return (
        <div className="container m-5 text-center">
            <h1>404 Page Not Found</h1>
            <h4>no match for <code>{location.pathname}</code></h4>
        </div>
    )
}

export default NotFound