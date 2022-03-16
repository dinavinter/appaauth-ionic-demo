import {useState} from "react";
import {AuthActionBuilder, AuthActions, AuthObserver} from "ionic-appauth";
import {Auth} from "./AuthService";
import {AuthorizationServiceConfiguration} from "@openid/appauth";
import {useIonViewDidLeave, useIonViewWillEnter} from "@ionic/react";

export  function useAuthState() {
    const [action, setAction] = useState(AuthActionBuilder.Default);
    const [history, setHistory] = useState(Auth.Instance.history);
    const [user, setUser] = useState();
    const [providerConfig, setProviderConfig] = useState<AuthorizationServiceConfiguration>();
    const [clientConfig, setClientConfig] = useState(Auth.Instance.authConfig);
    let observer:AuthObserver;
    useIonViewWillEnter(() => {
         observer = Auth.Instance.addActionListener((action) => {
            setAction(action);
            setHistory(Auth.Instance.history) 
            if (action.action === AuthActions.LoadUserInfoSuccess) {
                setUser(action.user);
            }
        });
    });
    useIonViewWillEnter(() => {
        Auth.Instance.configuration.then(setProviderConfig);
    });

    useIonViewDidLeave(() => {
        Auth.Instance.removeActionObserver(observer);
    });
    
    
    return {action,history, user, providerConfig,  clientConfig, session: Auth.Instance.session }
}