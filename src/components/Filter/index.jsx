import {React, useState, useEffect} from 'react';
import {ReactComponent as Information} from '../../images/svg/information.svg';
import InputComponent from '../InputComponent';
import dataFilter from '../../api/yandexMap.js';
import './Filter.style.scss';
import PropTypes from 'prop-types';

const Filter = ({updateMap}) => {

    const [filter, setFilter] = useState(false);
    const [paramFilter, setParamFilter] = useState([]);
    const [check, setCheck] = useState(false);

    const openFilter = () => {
        setFilter(prev => !prev)
    }

    useEffect(() =>{
        dataFilter
            .getDataFilter()
            .then(res => setParamFilter(res.data.data))
            .catch(e => console.log(e));
    }
    , [])

    return (
        <div className='filter'>
            <button onClick={openFilter} className='filter__button'>
                <Information />
            </button>
            {
                filter ?
                    <div className='filter__item'>
                        {
                            paramFilter.map(data => {
                                return <InputComponent
                                        key={data.id}
                                        type='checkbox'
                                        value={data.attributes.type}
                                        onChange={e => updateMap(data.id, e.target.checked)}
                                        classNameInput='filter__item_input'
                                        className='filter__item_content'
                                        children={
                                            <p className='filter__item_text'>
                                                <img src={'http://localhost:29080/strapi' + data.attributes.icon.data.attributes.url} className='filter__item_icon' alt='icon'/>
                                                {data.attributes.visible_name}
                                            </p>
                                        }
                                />
                            })
                        }
                    </div>
                : null
            }
        </div>
    )
}

Filter.propTypes = {
    updateMap: PropTypes.func,
}

export default Filter;