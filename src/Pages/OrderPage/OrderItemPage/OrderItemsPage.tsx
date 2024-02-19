import React, {useEffect, useState} from 'react';
import s from "./OrderItemsPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import {IBasketItem, IOrderItem} from "../../../utils/api/types";
import {OrderAPI} from "../../../utils/api";
import {useAuth} from "../../../utils/hooks/useAuth";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Header from "../../../components/Header/Header";
import OrdersItem from "./OrdersItem/OrdersItem";
import OrderItem from "../OrderItem/OrderItem";
import {StyledTableCell} from "../../../components/Tables/WhiteBlackTable";

const OrderItemsPage: React.FC = (props) => {
    const [orderBasketItems, setOrderBasketItems] = useState<IBasketItem[]>([])
    const [order, setOrder] = useState<IOrderItem>()
    const isAuth = useAuth();
    const {id} = useParams();

    let navigate = useNavigate();

    const fetchOrderBasketItems = async () => {
        try {
            const orderBasketItems = await OrderAPI.getBasketsOrderByOrderId(id);
            setOrderBasketItems(orderBasketItems)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const fetchOrderById = async () => {
        try {
            const order = await OrderAPI.getOrderById(id)
            setOrder(order)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        if (!isAuth) {
            return navigate('/');
        }

        fetchOrderBasketItems()
        fetchOrderById()
    }, [!isAuth]);

    const totalQuantity = orderBasketItems.reduce((a, b) => a + b.quantity, 0);
    const totalPrice = orderBasketItems.reduce((a, b) => a + b.itemPrice, 0);

    return (
        <>
            <Header/>
            <OrderItem id={order?.id} status={order?.status} createdAt={order?.createdAt} totalPrice={order?.totalPrice} userLogin={order?.userLogin} isButton={false}/>
            {
                orderBasketItems.length === 0 ?
                    <>No details</>
                    :
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="right">Quantity</StyledTableCell>
                                        <StyledTableCell align="right">Price</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderBasketItems?.map(c => (
                                        <OrdersItem id={c.id} quantity={c.quantity}
                                                    itemPrice={c.itemPrice}
                                                    itemId={c.itemId}/>
                                    ))}
                                </TableBody>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align="right">Total: {totalQuantity}</StyledTableCell>
                                    <StyledTableCell align="right">Total Price: {totalPrice}$</StyledTableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </>
            }
        </>
    )

};

export default OrderItemsPage;