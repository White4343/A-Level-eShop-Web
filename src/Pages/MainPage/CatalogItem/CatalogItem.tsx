import React from 'react';
import s from './CatalogItem.module.scss'
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

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

    return (
        <div className={s.item}>
            <p>{name}</p>
            <p>{price}$</p>
            <p>{availableStock} IN STOCK</p>
            <p>{pictureUrl}</p>
            <div className={s.buttonsSection}>
                <Button variant="outlined" onClick={() => navigate(`item/${id}`)}>Details</Button>
                <Button variant="outlined">Add to cart</Button>
            </div>
        </div>
    )
};

export default CatalogItem;