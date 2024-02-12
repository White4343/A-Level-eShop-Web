import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import CatalogItem from "./CatalogItem/CatalogItem";
import s from './MainPage.module.scss'
import {ICatalogItem} from "../../utils/api/types";
import {CatalogAPI} from "../../utils/api";

const MainPage: React.FC = (props) => {
    const [catalogItems, setCatalogItems] = useState<ICatalogItem[]>([])

    const fetchCatalogItems = async () => {
        try {
            const catalogItems = await CatalogAPI.getCatalogItems();
            setCatalogItems(catalogItems)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchCatalogItems()
    }, [])


    return (
        <>
            <Header/>
            <div className={s.catalogItemsWrapper}>
                {
                    catalogItems?.map(c => (
                        <CatalogItem key={c.id} id={c.id} name={c.name} price={c.price} pictureUrl={c.pictureUrl}
                                     description={c.description} availableStock={c.availableStock} typeId={c.typeId}
                                     brandId={c.brandId}/>))
                }
            </div>
        </>
    )
};

export default MainPage;