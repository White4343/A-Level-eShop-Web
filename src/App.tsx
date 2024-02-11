import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import {UserManager} from "oidc-client-ts";
import {IDENTITY_CONFIG} from "./utils/api";

function App() {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/signin-oidc' element={<Callback/>}></Route>
      </Routes>
  );
}

function Callback() {
    useEffect(() => {
        var mgr = new UserManager({
            response_mode: "query", authority: IDENTITY_CONFIG.authority, client_id: IDENTITY_CONFIG.client_id, redirect_uri: IDENTITY_CONFIG.redirect_uri
        });

        mgr.signinRedirectCallback().then(() => (window.location.href = "/"));
    }, []);

    return <p>Loading...</p>;
}

export default App;
