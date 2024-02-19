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

export interface IBasketItem {
    "id": number
    "createdAt": string
    "quantity": number
    "itemPrice": number
    "itemId": number
}

export interface IBrand {
    "id": number
    "name": string
}

export interface IType {
    "id": number
    "name": string
}

export interface IReqBasketItem {
    "quantity": number | undefined,
    "itemPrice": number | undefined,
    "itemId": number | string | undefined
}

export interface IOrderItem {
    "id": number,
    "status": string,
    "createdAt": string,
    "totalPrice": number,
    "userLogin": string
}

export interface IOrderBasketItem {
    "id": number,
    "createdAt": string,
    "quantity": number,
    "itemPrice": number,
    "itemId": number,
    "orderId": number
}