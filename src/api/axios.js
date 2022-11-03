import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:29080/strapi/api'
})

export default httpClient