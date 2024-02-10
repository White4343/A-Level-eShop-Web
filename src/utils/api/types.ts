export interface ICatalogItems {
    "data": ICatalogItem[]
}

export interface ICatalogItem {
    "id": number
    "name": string
    "price": number
    "pictureUrl": string
    "description": string
    "availableStock": number
    "typeId": number
    "brandId": number
}

export interface IReqUser {
    "login": string
    "password": string
}