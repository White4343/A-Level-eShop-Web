import React, {useEffect} from "react";
import {UserManager} from "oidc-client-ts";
import {IDENTITY_CONFIG} from "../utils/api";

function AuthCallback() {
    useEffect(() => {
        var mgr = new UserManager({
            response_mode: "query", authority: IDENTITY_CONFIG.authority, client_id: IDENTITY_CONFIG.client_id, redirect_uri: IDENTITY_CONFIG.redirect_uri, post_logout_redirect_uri: IDENTITY_CONFIG.post_logout_redirect_uri
        });

        mgr.signinRedirectCallback().then(() => (window.location.href = "/"));
    }, []);

    return <p>Loading...</p>;
}

export default AuthCallback;