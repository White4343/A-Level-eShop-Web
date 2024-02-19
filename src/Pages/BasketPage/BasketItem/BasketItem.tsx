import React, {useEffect, useState} from 'react';
import {ICatalogItem} from "../../../utils/api/types";
import {BasketAPI, CatalogAPI} from "../../../utils/api";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {StyledTableCell, StyledTableRow} from "../../../components/Tables/WhiteBlackTable";

interface BasketItemProps {
    id: number
    createdAt: string
    quantity: number
    itemPrice: number
    itemId: number
}

const BasketItem: React.FC<BasketItemProps> = ({id, createdAt, quantity, itemPrice, itemId}) => {
    const [catalogItem, setCatalogItem] = useState<ICatalogItem>();

    let navigate = useNavigate();


    const fetchCatalogItem = async () => {
        try {
            const catalogItem = await CatalogAPI.getCatalogItem(itemId);
            setCatalogItem(catalogItem);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const onClickDeleteBasketItem = async () => {
        try {
            let res: boolean;
            res = await BasketAPI.deleteBasketItem(id);

            if (!res) {
                alert(`Item with id #${id} is not deleted`)
            }
            alert(`Item is deleted`);

            navigate('/');

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchCatalogItem()
    }, []);

    return (
        <StyledTableRow key={catalogItem?.name}>
            <StyledTableCell component="th" scope="row">
                {catalogItem?.name}
            </StyledTableCell>
            <StyledTableCell align="right">{quantity}</StyledTableCell>
            <StyledTableCell align="right">{itemPrice}$</StyledTableCell>
            <StyledTableCell align="right">{createdAt}</StyledTableCell>
            <StyledTableCell align="right"><Button variant="outlined" onClick={onClickDeleteBasketItem}>Delete</Button></StyledTableCell>
        </StyledTableRow>
    )

};

export default BasketItem;