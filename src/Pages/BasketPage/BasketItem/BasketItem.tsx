import React, {useEffect, useState} from 'react';
import {ICatalogItem} from "../../../utils/api/types";
import {BasketAPI, CatalogAPI} from "../../../utils/api";
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

interface BasketItemProps {
    id: number
    createdAt: string
    quantity: number
    itemPrice: number
    itemId: number
    cellStyle: any
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const BasketItem: React.FC<BasketItemProps> = ({id, createdAt, quantity, itemPrice, itemId, cellStyle}) => {
    const [catalogItem, setCatalogItem] = useState<ICatalogItem>();
    const StyledTableCell = cellStyle;

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