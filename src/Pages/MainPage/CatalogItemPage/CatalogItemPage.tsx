import React, {useEffect, useState} from 'react';
import s from './CatalogItemPage.module.scss'
import Header from "../../../components/Header/Header";
import {IBasketItem, IBrand, ICatalogItem, IReqBasketItem, IType} from "../../../utils/api/types"
import {BasketAPI, CatalogAPI} from "../../../utils/api";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {useAuth} from "../../../utils/hooks/useAuth";

const CatalogItemPage: React.FC = () => {
    const [item, setItem] = useState<ICatalogItem>()
    const [brand, setBrand] = useState<IBrand>()
    const [type, setType] = useState<IType>()
    const {id} = useParams();
    const isAuth = useAuth();

    const fetchItem = async () => {
        try {
            const item = await CatalogAPI.getCatalogItem(id);
            setItem(item)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const fetchBrandType = async () => {
        try {
            const brand = await CatalogAPI.getBrandById(item?.brandId);
            const type = await CatalogAPI.getTypeById(item?.typeId);

            setBrand(brand);
            setType(type);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const onClickPostBasketItem = async () => {
        if(!isAuth) {
            alert('Pls login')
            return
        }

        try {
            let res: IBasketItem;

            let obj: IReqBasketItem = {
                quantity: 1,
                itemPrice: item?.price,
                itemId: id
            }

            res = await BasketAPI.postBasketItem(obj);

            if (res !== null) {
                alert("Added to cart!")
            }

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchItem();
    }, []);

    useEffect(() => {
        if (item !== undefined) {
            fetchBrandType();
        }
    }, [item]);

    return (
        <>
            <Header/>

            <div className={s.wrapper}>
                <p>{item?.pictureUrl}</p>
                <p>Name: {item?.name}</p>
                <p>Brand Name: {brand?.name}</p>
                <p>Type: {type?.name}</p>
                <p>Description: {item?.description}</p>
                <p>Price: {item?.price}$</p>
                <p>In stock: {item?.availableStock}</p>
                <Button variant="outlined" onClick={onClickPostBasketItem}>Add to cart</Button>
            </div>
        </>
    )

};

export default CatalogItemPage;