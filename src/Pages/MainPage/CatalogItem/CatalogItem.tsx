import React from 'react';
import s from './CatalogItem.module.scss'

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


    return (
        <div className={s.item}>
         <p>{name}</p>
         <p>{price}$</p>
         <p>{availableStock} IN STOCK</p>
         <p>{pictureUrl}</p>
        </div>
    )
};

export default CatalogItem;