import httpClient from './axios';

const getDataPlacemark = async () => {
    return await httpClient.get('/ecosystems?populate=photo,type.icon')
}

const getDataFilter = async () => {
    return await httpClient.get('/tipy-obektov-ekosistems?populate=icon')
}

const getUseFilter = async (id) => {
    let string = '';
    id.map((data, id) => {
        string += `&filters[id][$in][${id}]=${data}`
    })

    return await httpClient.get(`/ecosystems?populate=photo,type.icon${string}`)
}

export default {
    getDataPlacemark,
    getDataFilter,
    getUseFilter
}