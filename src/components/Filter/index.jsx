import {React, useState, useEffect} from 'react';
import {ReactComponent as Information} from '../../images/svg/information.svg';
import InputComponent from '../InputComponent';
import dataFilter from '../../api/yandexMap.js';
import './Filter.style.scss';

const Filter = () => {

    const [filter, setFilter] = useState(false);
    const [paramFilter, setParamFilter] = useState([]);

    const openFilter = () => {
        setFilter(prev => !prev)
    }

    useEffect(() =>{
        dataFilter
            .getDataFilter()
            .then(res => setParamFilter([res.data.data[0]]))
            .catch(e => console.log(e));
    }
    , [])

    console.log(paramFilter)

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
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                        }}
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

export default Filter;