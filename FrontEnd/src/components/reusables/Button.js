import React from 'react'

const Button = (props) => {
    const { type, className, value, handleClick, } = props

    return (
        <button 
            type={type}
            className={className} 
            onClick={handleClick}
        >
        {value}
        </button>
    )
}

export default Button