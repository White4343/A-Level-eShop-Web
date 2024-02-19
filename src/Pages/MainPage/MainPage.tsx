import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import CatalogItem from "./CatalogItem/CatalogItem";
import s from './MainPage.module.scss'
import { IBrand, ICatalogItem, IType } from "../../utils/api/types";
import { CatalogAPI } from "../../utils/api";

const MainPage: React.FC = (props) => {
    const [catalogItems, setCatalogItems] = useState<ICatalogItem[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [types, setTypes] = useState<IType[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 5;

    const fetchCatalogItems = async () => {
        try {
            const items = await CatalogAPI.getCatalogItems();
            setCatalogItems(items);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    const fetchBrands = async () => {
        const brands = await CatalogAPI.getBrands();
        setBrands(brands);
    }

    const fetchTypes = async () => {
        const types = await CatalogAPI.getTypes();
        setTypes(types);
    }

    useEffect(() => {
        fetchCatalogItems();
        fetchBrands();
        fetchTypes();
    }, []);

    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const brandId = parseInt(event.target.value);
        setSelectedBrand(brandId);
        setCurrentPage(1); // Reset page number when brand changes
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const typeId = parseInt(event.target.value);
        setSelectedType(typeId);
        setCurrentPage(1); // Reset page number when type changes
    };

    const filterCatalogItems = (item: ICatalogItem) => {
        if (
            (!selectedBrand || item.brandId === selectedBrand) &&
            (!selectedType || item.typeId === selectedType)
        ) {
            return true;
        }
        return false;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = catalogItems.filter(filterCatalogItems).slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    currentItems.sort((a, b) => a.id - b.id)

    console.log(process.env.CATALOG_API)

    return (
        <>
            <Header />
            <div className={s.filterWrapper}>
                <select onChange={handleBrandChange} value={selectedBrand || ''}>
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleTypeChange} value={selectedType || ''}>
                    <option value="">All Types</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={s.catalogItemsWrapper}>
                {currentItems.map((item) => (
                    <CatalogItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        pictureUrl={item.pictureUrl}
                        description={item.description}
                        availableStock={item.availableStock}
                        typeId={item.typeId}
                        brandId={item.brandId}
                    />
                ))}
            </div>
            <div className={s.pagination}>
                {Array.from({ length: Math.ceil(catalogItems.filter(filterCatalogItems).length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default MainPage;
