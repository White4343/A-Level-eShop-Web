import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {IOrderItem} from "../../utils/api/types";
import {OrderAPI} from "../../utils/api";
import {useAuth} from "../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import OrderItem from "./OrderItem/OrderItem";
import s from "./OrderPage.module.scss"

const OrderPage: React.FC = (props) => {
    const [orders, setOrders] = useState<IOrderItem[]>([])
    const isAuth = useAuth();

    let navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const orders = await OrderAPI.getOrdersByLogin()
            setOrders(orders)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        if (!isAuth) {
            return navigate('/');
        }
        fetchOrders()
    }, [!isAuth]);

    return (
        <>
            <Header/>
            <div className={s.ordersWrapper}>
                {
                    orders.length === 0 ?
                        <>No orders</>
                        :
                        orders.map(order => <OrderItem id={order.id} status={order.status} createdAt={order.createdAt}
                                                       totalPrice={order.totalPrice} userLogin={order.userLogin}/>)
                }
            </div>
        </>
    )

};

export default OrderPage;