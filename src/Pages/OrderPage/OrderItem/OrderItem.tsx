import React from 'react';
import s from "./OrderItem.module.scss"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

interface OrderItemProps {
    id: number | undefined,
    status: string | undefined,
    createdAt: string | undefined,
    totalPrice: number | undefined,
    userLogin: string | undefined
    isButton?: boolean
}

const OrderItem: React.FC<OrderItemProps> = ({id, status, createdAt, totalPrice, userLogin, isButton}) => {

    let navigate = useNavigate();

    return (
        <div className={s.orderItemWrapper}>
            <div className={s.leftItemSide}>
                <p>Order #{id}</p>
                <p>Status: {status}</p>
            </div>
            <div className={s.rightItemSide}>
                <p>Date: {createdAt}</p>
                <p>Sum: {totalPrice}$</p>
            </div>
            {
                isButton === false ? <></> :
                    <div className={s.footerItem}>
                        <Button variant="outlined" onClick={() => navigate(`${id}`)}>Details</Button>
                    </div>
            }
        </div>
    )

};

export default OrderItem;