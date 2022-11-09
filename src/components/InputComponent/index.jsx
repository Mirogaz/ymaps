import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({type, className, children, text, onChange, classNameInput, value, checked}) => {
    return (
        <div className={className}>
            <input type={type}
                value={value}
                className={classNameInput}
                placeholder={text}
                onChange={onChange}
                checked={checked}
                />
            {children}
        </div>
    );
}

InputComponent.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    text: PropTypes.string,
    onChange: PropTypes.func,
    classNameInput: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
}

export default InputComponent;