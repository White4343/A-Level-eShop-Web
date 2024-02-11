import axios from "axios";
import {IReqUser} from "./types";

const catalogAPI = axios.create({
    baseURL: 'http://localhost:5106'
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
    }
}

export const UserAPI = {
    login(data: IReqUser) {
        return identityServer.post('connect/token')
    }
}