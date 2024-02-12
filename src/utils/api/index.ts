import axios from "axios";
import {IReqBasketItem, IReqUser} from "./types";
import Cookies from "js-cookie";

const catalogAPI = axios.create({
    baseURL: 'http://localhost:5106'
})

const basketAPI = axios.create({
    baseURL: 'http://localhost:5153'
})

const identityServer = axios.create({
    baseURL: 'https://localhost:7001'
})

export const IDENTITY_CONFIG = {
    authority: "https://localhost:7001",
    client_id: "reactui",
    redirect_uri: "http://localhost:3000/signin-oidc",
    post_logout_redirect_uri: "http://localhost:3000",
    response_type: "code",
    scope: "basket.client order.client"
}

export const CatalogAPI = {
    getCatalogItems() {
        return catalogAPI.get(`/item`).then(res => res.data)
    },
    getCatalogItem(id: string | undefined | number) {
        return catalogAPI.get(`/item/${id}`).then(res => res.data)
    },
    getBrandById(id: number | undefined) {
        return catalogAPI.get(`/brand/${id}`).then(res => res.data)
    },
    getTypeById(id: number | undefined) {
        return catalogAPI.get(`/type/${id}`).then(res => res.data)
    }
}

export const BasketAPI = {
    getBasketByLogin() {
        const token = Cookies.get('token');

        return basketAPI.post(`/Basket/GetBasketByLogin`, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    },
    postBasketItem({quantity, itemPrice, itemId} : IReqBasketItem) {
        const token = Cookies.get('token')

        return basketAPI.post(`/basket`, {quantity, itemPrice, itemId}, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    }
}

export const UserAPI = {
    login(data: IReqUser) {
        return identityServer.post('connect/token')
    }
}