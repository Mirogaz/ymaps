import {React, useState, useEffect} from 'react';
import './YandexMap.style.scss';
import Filter from '../Filter';
import dataPlacemark from '../../api/yandexMap.js';
import ModalMarker from '../ModalMarker';
import { YMaps, Map, GeolocationControl, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

const YandexMap = () => {

    const [modal, setModal] = useState(false);
    const [dataMaps, setDataMaps] = useState([]);
    const [iconPlacemark, setIconPlacemark] = useState([]);
    const [coordX, setCoordX] = useState(0);
    const [coordY, setCoordY] = useState(0);

    const determinationCoordinates = (e) => {
        setCoordX(e.clientX + 100);
        setCoordY(e.clientY - 200);
    }

    const openModalMarker = () => {
        setModal(prev => !prev)
    }

    useEffect(() => {
        dataPlacemark
            .getDataModal()
            .then(res => setDataMaps(res.data.data))
            .catch(e => console.log(e));

        dataPlacemark
            .getDataPlacemark()
            .then(res => setIconPlacemark(res.data.data[0].attributes.type.data.attributes.icon.data))
            .catch(e => console.log(e));
    }, [])

    return (
        <div className='map' onClick={determinationCoordinates}>
            <Filter />
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
                                    onClick={openModalMarker}
                                    geometry={[data.attributes.latitude, data.attributes.longitude]}
                                    options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: iconPlacemark.id === data.id ? 'http://localhost:29080/strapi' + iconPlacemark.attributes.url : '',
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
            { modal ? <div tabIndex="-1" onBlur={() => setModal(false)}>
                <ModalMarker
                    style={{right: `${coordX}px`, top: `${coordY}px`}}
                    modalImage={'http://localhost:29080/strapi' + dataMaps[0].attributes.photo.data.attributes.url}
                    modalHead={dataMaps[0].attributes.name}
                    modalAddress={dataMaps[0].attributes.address}
                    modalBody={dataMaps[0].attributes.description}
                />
            </div> : '' }
        </div>
    );
};

export default YandexMap;