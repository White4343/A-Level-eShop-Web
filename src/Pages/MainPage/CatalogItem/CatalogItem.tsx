import React from 'react';
import s from './CatalogItem.module.scss'
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {IBasketItem, IReqBasketItem} from "../../../utils/api/types";
import {BasketAPI} from "../../../utils/api";
import {useAuth} from "../../../utils/hooks/useAuth";

interface CatalogItemProps {
    id: number
    name: string
    price: number
    pictureUrl: string
    description: string
    availableStock: number
    typeId: number
    brandId: number
}

const CatalogItem: React.FC<CatalogItemProps> = ({id, name, price, description, pictureUrl, availableStock, brandId, typeId}) => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    const onClickPostBasketItem = async () => {
        if(!isAuth) {
            alert('Pls login')
            return
        }

        try {
            let res: IBasketItem;

            let obj: IReqBasketItem = {
                quantity: 1,
                itemPrice: price,
                itemId: id
            }

            res = await BasketAPI.postBasketItem(obj);

            if (res !== null) {
                alert("Added to cart!")
            }

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    return (
        <div className={s.item}>
            <p>{name}</p>
            <p>{price}$</p>
            <p>{availableStock} IN STOCK</p>
            <p>{pictureUrl}</p>
            <div className={s.buttonsSection}>
                <Button variant="outlined" onClick={() => navigate(`item/${id}`)}>Details</Button>
                <Button variant="outlined" onClick={onClickPostBasketItem}>Add to cart</Button>
            </div>
        </div>
    )
};

export default CatalogItem;