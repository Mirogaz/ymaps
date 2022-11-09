import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({type, className, children, text, onChange, onClick, classNameInput, value, checked}) => {
    return (
        <div className={className}>
            <input type={type}
                value={value}
                className={classNameInput}
                placeholder={text}
                onChange={onChange}
                onClick={onClick}
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
    onClick: PropTypes.func,
    classNameInput: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
}

export default InputComponent;