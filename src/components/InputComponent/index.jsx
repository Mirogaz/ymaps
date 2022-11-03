import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({type, className, children, text, onChange, classNameInput}) => {
    return (
        <div className={className}>
            <input type={type} className={classNameInput} placeholder={text} onChange={onChange}/>
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
    classNameInput: PropTypes.string
}

export default InputComponent;