import React from 'react'

const Image = (props) => {
    const { className, src, alt } = props
    return (
        <img className={className} src={src} alt={alt} width="250" height="225"/>
    )
}

export default Image