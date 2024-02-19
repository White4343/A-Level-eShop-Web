import React, {useEffect, useState} from 'react';
import s from "./OrdersItem.module.scss"
import Button from "@mui/material/Button";
import {ICatalogItem} from "../../../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {CatalogAPI} from "../../../../utils/api";
import {StyledTableCell, StyledTableRow} from "../../../../components/Tables/WhiteBlackTable";

interface OrdersItemItemProps {
    id: number
    quantity: number
    itemPrice: number
    itemId: number
}

const OrdersItem: React.FC<OrdersItemItemProps> = ({id, quantity, itemPrice, itemId}) => {
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
            <StyledTableCell align="right"><Button variant="outlined" onClick={() => navigate(`../item/${itemId}`)}>See Item Page</Button></StyledTableCell>
        </StyledTableRow>
    )

};

export default OrdersItem;