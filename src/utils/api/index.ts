import axios from "axios";

const baseAPI = axios.create({
    baseURL: 'http://localhost:5106'
})

export const CatalogAPI = {
    getCatalogItems() {
        return baseAPI.get(`/item`).then(res => res.data)
    }
}