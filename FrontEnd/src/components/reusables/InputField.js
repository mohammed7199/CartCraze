import React from 'react'

const InputField = (props) => {
    const { type, value, handleChange, name, placeholder, disabled, className } = props

    return (
        <input
            className={ className }
            type={ type }
            value={ value || '' }
            onChange={ handleChange }
            name={ name }
            placeholder={ placeholder }
            disabled={ disabled }
        />
    )
}

export default InputField