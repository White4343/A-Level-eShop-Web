import React, {useEffect, useState} from 'react';
import s from './BasketPage.module.scss'
import {useAuth} from "../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import {IBasketItem} from "../../utils/api/types";
import {BasketAPI} from "../../utils/api";
import BasketItem from "./BasketItem/BasketItem";
import basketItem from "./BasketItem/BasketItem";

const BasketPage: React.FC = (props) => {
    const [basketItems, setBasketItems] = useState<IBasketItem[]>([])
    const isAuth = useAuth();

    let navigate = useNavigate();

    const fetchBasketItems = async () => {
        try {
            const basketItems = await BasketAPI.getBasketByLogin();
            setBasketItems(basketItems);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        if (!isAuth){
            return navigate('/');
        }
        fetchBasketItems();
    }, [!isAuth]);

    return (
        <>
            <Header/>
            {basketItems.length === 0 ?
                <>No items in basket</>
                :
                <div className={s.basketItemsWrapper}>
                    {
                        basketItems?.map(c => (
                            <BasketItem id={c.id} createdAt={c.createdAt} quantity={c.quantity} itemPrice={c.itemPrice} itemId={c.itemId}/>
                        ))
                    }
                </div>
            }
        </>
    )

};

export default BasketPage;