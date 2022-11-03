import httpClient from './axios';

const getDataModal = async () => {
    return await httpClient.get('/ecosystems?populate=*')
}

const getDataPlacemark = async () => {
    return await httpClient.get('/ecosystems?populate=photo,type.icon')
}

const getDataFilter = async () => {
    return await httpClient.get('/tipy-obektov-ekosistems?populate=icon')
}

export default {
    getDataModal,
    getDataPlacemark,
    getDataFilter
}