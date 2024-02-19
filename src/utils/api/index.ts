import axios from "axios";
import {IReqBasketItem, IReqUser} from "./types";
import Cookies from "js-cookie";

export const catalogApiPath = process.env.REACT_APP_CATALOG_API;
export const basketApiPath = process.env.REACT_APP_BASKET_API;
export const orderApiPath = process.env.REACT_APP_ORDER_API;
export const reactUiPath = process.env.REACT_APP_REACT_UI;
export const identityApiPath = process.env.REACT_APP_IDENTITY_API;

const catalogAPI = axios.create({
    baseURL: catalogApiPath
})

const basketAPI = axios.create({
    baseURL: basketApiPath
})

const orderAPI = axios.create({
    baseURL: orderApiPath
})

const identityServer = axios.create({
    baseURL: identityApiPath
})

export const IDENTITY_CONFIG = {
    authority: (identityApiPath) ? identityApiPath : "",
    client_id: "reactui",
    redirect_uri: reactUiPath + "/signin-oidc",
    post_logout_redirect_uri: reactUiPath,
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
    getBrands() {
        return catalogAPI.get(`/brand`).then(res => res.data)
    },
    getTypes() {
        return catalogAPI.get(`/type`).then(res => res.data)
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

        return basketAPI.post(`/basket/GetBasketByLogin`, null, {
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
    },
    deleteBasketItem(id: string | number | undefined){
        const token = Cookies.get('token')

        return basketAPI.delete(`/basket/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    },
    deleteBasket() {
        const token = Cookies.get('token')

        return basketAPI.post(`/basket/DeleteBasketByLogin`, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    }
}

export const OrderAPI = {
    getOrdersByLogin() {
        const token = Cookies.get('token');

        return orderAPI.get(`/order/GetOrdersByUser`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    },
    getOrderById(id: string | undefined) {
        const token = Cookies.get('token');

        return orderAPI.get(`/order/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    },
    getBasketsOrderByOrderId(id: number | string | undefined) {
        const token = Cookies.get('token');

        return orderAPI.get(`/orderBasket/GetOrderBasketByOrderId/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.data)
    },
    postBasketOrdersByBasket() {
        const token = Cookies.get('token');

        return orderAPI.post(`orderBasket`, null, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}

export const UserAPI = {
    login(data: IReqUser) {
        return identityServer.post('connect/token')
    }
}