import React, {useEffect, useState} from 'react';
import s from './BasketItem.module.scss'
import {ICatalogItem} from "../../../utils/api/types";
import {CatalogAPI} from "../../../utils/api";


interface BasketItemProps {
    id: number
    createdAt: string
    quantity: number
    itemPrice: number
    itemId: number
}

const BasketItem: React.FC<BasketItemProps> = ({id, createdAt, quantity, itemPrice, itemId}) => {
    const [catalogItem, setCatalogItem] = useState<ICatalogItem>();

    const fetchCatalogItem = async () => {
        try {
            const catalogItem = await CatalogAPI.getCatalogItem(itemId);
            setCatalogItem(catalogItem);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchCatalogItem()
    }, []);

    return (
        <div className={s.item}>
            <p>{catalogItem?.name}</p>
            <p>{quantity}</p>
            <p>{itemPrice}</p>
            <p>{createdAt}</p>
        </div>
    )

};

export default BasketItem;