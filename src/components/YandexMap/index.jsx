import {React, useState, useEffect} from 'react';
import './YandexMap.style.scss';
import Filter from '../Filter';
import dataPlacemark from '../../api/yandexMap.js';
import ModalMarker from '../ModalMarker';
import { YMaps, Map, GeolocationControl, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

const YandexMap = () => {

    const [modal, setModal] = useState(false);
    const [dataMaps, setDataMaps] = useState([]);
    const [coordX, setCoordX] = useState(0);
    const [coordY, setCoordY] = useState(0);
    const [idPlacemark, setIdPlacemark] = useState(0);
    const [idFilter, setIdFilter] = useState([]);

    const determinationCoordinates = (e) => {
        setCoordX(e.clientX + 100);
        setCoordY(e.clientY - 200);
    }

    const updateMap = (value, checked) => {
        if(checked) {
            setIdFilter([...idFilter, value])
            dataPlacemark
                .getUseFilter(idFilter)
                .then(res => {
                    setDataMaps(res.data.data)
                        }
                    )
                .catch(e => console.log(e));
        } else {
            setIdFilter(idFilter.filter(id => id !== value))
        }
    }

    console.log(idFilter)

    useEffect(() => {
        dataPlacemark
            .getDataPlacemark()
            .then(res => setDataMaps(res.data.data))
            .catch(e => console.log(e));
    }, [])

    return (
        <div className='map' onClick={determinationCoordinates}>
            <Filter updateMap={updateMap}/>
            <YMaps version={2.1}>
                <Map
                    onClick={() => setModal(false)}
                    defaultState={{
                        center: [62.7265672139301, 72.58875649651917],
                        zoom: 4,
                        controls: [],
                    }}
                    modules={
                        [
                            'geoObject.addon.balloon',
                            'geoObject.addon.hint',
                            'layout.Image',
                            'templateLayoutFactory'
                        ]
                    }
                    width='100%'
                    height='692px'
                >
                {
                    dataMaps.map(data => {
                        return <Placemark
                                    key={data.id}
                                    onClick={() => {
                                        setIdPlacemark(data.id);
                                        setModal(prev => !prev);
                                        }
                                    }
                                    geometry={[data.attributes.latitude, data.attributes.longitude]}
                                    options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: 'http://localhost:29080/strapi' + data.attributes.type.data.attributes.icon.data.attributes.url,
                                            iconImageSize: [75, 75],
                                        }
                                    }
                                />
                    })
                }
                <ZoomControl options={{ float: 'right', size: "small", position: {
                    right: 10,
                    top: 300
                } }} />
                <GeolocationControl options={{ float: 'right'}} />
                </Map>
            </YMaps>
            { modal ?
                   dataMaps.map(data => {
                        if(data.id === idPlacemark) {
                            return <div tabIndex="-1" onBlur={() => setModal(false)}>
                                    <ModalMarker
                                        key={data.id}
                                        style={{right: `${coordX}px`, top: `${coordY}px`}}
                                        modalImage={'http://localhost:29080/strapi' + data.attributes.photo.data.attributes.url}
                                        modalHead={data.attributes.name}
                                        modalAddress={data.attributes.address}
                                        modalBody={data.attributes.description}
                                    />
                                </div>
                        }
                   })
                 : '' }
        </div>
    );
};

export default YandexMap;