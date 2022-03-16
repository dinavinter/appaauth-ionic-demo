import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
    useIonViewWillEnter,
    useIonViewDidLeave,
    IonList,
    IonSplitPane,
    IonMenu,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonButtons,
    IonGrid,
    IonRow, IonTabs, IonTabBar, IonTabButton, IonBadge, IonCol
} from '@ionic/react';
import {settingsOutline, menu, bagOutline, calendar, map, informationCircle} from 'ionicons/icons'

import {ActionCard, UserInfoCard} from '../components';
import {Auth} from '../services/AuthService';
import {AuthActions, AuthActionBuilder, AuthObserver} from 'ionic-appauth';
import {RouteComponentProps} from 'react-router';
import {JsonCard} from "../components/json-card/JsonTreeViewer";
import {AuthorizationServiceConfiguration} from "@openid/appauth";
import {useAuthState} from "../services/authState";

interface HomePageProps extends RouteComponentProps {
}

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {

    // const [action, setAction] = useState(AuthActionBuilder.Default);
    // const [history, setHistory] = useState(Auth.Instance.history);
    // const [user, setUser] = useState();
    const [providerConfiguration, setProviderConfiguration] = useState<AuthorizationServiceConfiguration>();
    const [clientConfiguration, _] = useState(Auth.Instance.authConfig);

    const {action, history, user, providerConfig, clientConfig, session} = useAuthState();

    let observer: AuthObserver;

    useIonViewWillEnter(() => {
        observer = Auth.Instance.addActionListener((action) => {
            // setAction(action);
            // setHistory(Auth.Instance.history)
            if (action.action === AuthActions.SignOutSuccess) {
                props.history.replace('landing');
            }

            if (action.action === AuthActions.LoadUserInfoSuccess) {
                // setUser(action.user);
            }
        });
    });
    useIonViewWillEnter(() => {
        Auth.Instance.configuration.then(setProviderConfiguration);
    });

    useIonViewDidLeave(() => {
        Auth.Instance.removeActionObserver(observer);
    });

    function handleSignOut(e: any) {
        e.preventDefault();
        Auth.Instance.signOut();
    }

    function handleRefresh(e: any) {
        e.preventDefault();
        Auth.Instance.refreshToken();
    }

    function handleGetUserDetails(e: any) {
        e.preventDefault();
        Auth.Instance.loadUserInfo();
    }

    let personCircle;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Logged In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={handleGetUserDetails}>Get User Details</IonButton>
                <IonButton onClick={handleRefresh}>Refresh Token</IonButton>
                <IonButton onClick={handleSignOut}>Sign Out</IonButton>

                <IonGrid>
                    <IonCol>
                        <IonHeader>
                            <IonToolbar>
                                <IonButtons slot="start">
                                    <IonMenuToggle>
                                        <IonButton>
                                            <IonIcon slot="icon-only" icon={menu}/>
                                        </IonButton>
                                    </IonMenuToggle>
                                </IonButtons>
                                <IonTitle>Tracer</IonTitle>
                            </IonToolbar>
                        </IonHeader>

                        <IonList>
                            {history.map(action =>
                                <IonItem>
                                    <JsonCard data={action} title={action.action}/>

                                </IonItem>
                            )}
                        </IonList>

                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonMenuToggle>
                                            <IonButton>
                                                <IonIcon slot="icon-only" icon={menu}/>
                                            </IonButton>
                                        </IonMenuToggle>
                                    </IonButtons>
                                    <IonTitle>Provider Configuration</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonCol>
                                <JsonCard title={"Provider Configuration"} data={providerConfiguration}/>
                            </IonCol>

                        </IonRow>
                        <IonRow>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonMenuToggle>
                                            <IonButton>
                                                <IonIcon slot="icon-only" icon={menu}/>
                                            </IonButton>
                                        </IonMenuToggle>
                                    </IonButtons>
                                    <IonTitle>Client Configuration</IonTitle>
                                </IonToolbar>
                            </IonHeader>

                            <IonCol>
                                <JsonCard title={"Client Configuration"} data={clientConfiguration}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonMenuToggle>
                                            <IonButton>
                                                <IonIcon slot="icon-only" icon={menu}/>
                                            </IonButton>
                                        </IonMenuToggle>
                                    </IonButtons>
                                    <IonTitle>User Info</IonTitle>
                                </IonToolbar>

                            </IonHeader>
                            <JsonCard data={user} title={"User Info"}/>
                        </IonRow>

                        <IonRow>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonMenuToggle>
                                            <IonButton>
                                                <IonIcon slot="icon-only" icon={menu}/>
                                            </IonButton>
                                        </IonMenuToggle>
                                    </IonButtons>
                                    <IonTitle>Session Info</IonTitle>
                                </IonToolbar>

                            </IonHeader>
                            <JsonCard data={session} title={"Session Details"}/>
                        </IonRow>
                    </IonCol>

                    {/*<JsonCard title={"Provider Configuration"}   data={providerConfiguration} />*/}
                    {/*<JsonCard title={"Client Configuration"}   data={clientConfiguration} />*/}
                    {/*<JsonCard data={user} title={"User Info"}/>*/}


                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
