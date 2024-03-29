import React, {useEffect} from 'react';
import s from './Header.module.scss'
import {useNavigate} from "react-router-dom";
import {UserManager} from "oidc-client-ts";
import {IDENTITY_CONFIG} from "../../utils/api";
import Cookies from 'js-cookie';
import {useAuth} from "../../utils/hooks/useAuth";

const Header: React.FC = (props) => {
    const navigate = useNavigate();
    const mgr = new UserManager(IDENTITY_CONFIG);
    const isAuth = useAuth();

    useEffect(() => {
        if(!isAuth) {
            mgr.getUser().then((user) => {
                if (user) {
                    Cookies.set('token', user.access_token);
                }
            });
        }
    }, []);

    const onLogOut = () => {
        Cookies.remove('token')
        mgr.signoutRedirect();
    }

    return (
        <div className={s.wrapper_header}>
            <div className={s.item} onClick={() => navigate('/')}>Main Page</div>
            <div className={s.item} onClick={() => navigate('/basket')}>Basket</div>
            <div className={s.item} onClick={() => navigate('/order')}>Order's Status</div>
            {isAuth ? (
                    <div className={s.item} onClick={() => onLogOut()}>
                        LogOut
                    </div>
                ) : (
                    <div className={s.item} onClick={() => mgr.signinRedirect()}>
                        Login
                    </div>
                )
            }
        </div>
    )
};

export default Header;