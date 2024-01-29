import React from 'react';
import s from './Header.module.scss'
import {useNavigate} from "react-router-dom";


const Header: React.FC = (props) => {
    const navigate = useNavigate();

    return (
        <div className={s.wrapper_header}>
            <div className={s.item} onClick={() => navigate('/')}>Main Page</div>
            <div className={s.item}>Basket</div>
            <div className={s.item}>Order Status</div>
            <div className={s.item}>Login</div>
        </div>
    )
};

export default Header;