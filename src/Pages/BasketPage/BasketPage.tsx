import React, {useEffect, useState} from 'react';
import s from './BasketPage.module.scss'
import {useAuth} from "../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import {IBasketItem} from "../../utils/api/types";
import {BasketAPI} from "../../utils/api";
import BasketItem from "./BasketItem/BasketItem";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const BasketPage: React.FC = (props) => {
    const [basketItems, setBasketItems] = useState<IBasketItem[]>([])
    const isAuth = useAuth();

    let navigate = useNavigate();

    const totalQuantity = basketItems.reduce((a, b) => a + b.quantity, 0);
    const totalPrice = basketItems.reduce((a, b) => a + b.itemPrice, 0);

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
        if (!isAuth) {
            return navigate('/');
        }
        fetchBasketItems();
    }, [!isAuth]);

    const onClickDeleteBasket = async () => {
        try {
            let res: boolean;
            res = await BasketAPI.deleteBasket();

            if (!res) {
                alert(`Basket is not deleted`)
            }
            alert(`Basket is deleted`);

            navigate('/');

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    return (
        <>
            <Header/>
            {basketItems.length === 0 ?
                <>No items in basket</>
                :
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Item Name</StyledTableCell>
                                    <StyledTableCell align="right">Quantity</StyledTableCell>
                                    <StyledTableCell align="right">Price</StyledTableCell>
                                    <StyledTableCell align="right">Date added</StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {basketItems?.map(c => (
                                    <BasketItem id={c.id} createdAt={c.createdAt} quantity={c.quantity}
                                                itemPrice={c.itemPrice}
                                                itemId={c.itemId} cellStyle={StyledTableCell}/>
                                ))}
                            </TableBody>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="right">Total: {totalQuantity}</StyledTableCell>
                                <StyledTableCell align="right">Total Price: {totalPrice}$</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"><Button variant="outlined" onClick={onClickDeleteBasket}>Delete
                                    All</Button></StyledTableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                    <div className={s.createOrderButton}>
                        <Button variant="outlined">Create Order</Button>
                    </div>
                </>
            }
        </>
    )

};

export default BasketPage;