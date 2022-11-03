import React from 'react';
import PropTypes from 'prop-types';
import './ModalMarker.style.scss';

const ModalMarker = ({modalImage, modalHead, modalBody, modalAddress}) => {
    return (
        <div className='modal'>
                <img className='modal__image' src={modalImage} alt='ModalImage' />
                <p className='modal__head'>{modalHead}</p>
                <p className='modal__address'>{modalAddress}</p>
                <p className='modal__body'>{modalBody}</p>
        </div>
    );
};

ModalMarker.propTypes = {
    modalImage: PropTypes.string,
    modalHead: PropTypes.string,
    modalAddress: PropTypes.string,
    modalBody: PropTypes.string
}

export default ModalMarker;