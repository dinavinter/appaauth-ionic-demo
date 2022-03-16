import React from 'react';
import {IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonList,  IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs} from '@ionic/react';

import {calendar, personCircle, map, informationCircle} from 'ionicons/icons';
import {Redirect, Route} from "react-router-dom";
import {Auth} from "../../services/AuthService";
import {useAuthState} from "../../services/authState";
import {JsonCard} from "../json-card/JsonTreeViewer";
import {RouteComponentProps} from "react-router";


export const TabsExample: React.FC = () => {

    const {action, history, user, providerConfig, clientConfig, session} = useAuthState();

    const PageLayout : React.FC<{title:string}> =  ({children, title}) =>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {children}
            </IonContent>
        </IonPage>   ;
    

    const History = () =>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Trace</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonList>
                {history.map(action =>
                    <JsonCard data={action} title={action.action}/>
                )}
            </IonList>
            </IonContent>
        </IonPage>;

    const ProviderConfig = () =>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Readme</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <JsonCard data={providerConfig} title={"Provider Config"}/>
            </IonContent>
        </IonPage>;

    // const ProviderConfig = () => <PageLayout title={"Provider Config"}><JsonCard data={providerConfig} title={"Provider Config"}/></PageLayout>;
    const ClientConfig = () => <PageLayout title={"Provider Config"}><JsonCard data={clientConfig} title={"Client Config"}/></PageLayout>;

    return (
        <IonTabs>


            <IonRouterOutlet>
                <Route path="/app/provider-config" component={ProviderConfig}/>
                <Route path="/app/trace" component={History}/>
                <Route exact path="/app/client" component={ProviderConfig}/>
                <Route path="/app/" render={() => <Redirect to="/app/trace"/>} exact={true}/>

            </IonRouterOutlet>

            <IonTabBar slot="top">
                <IonTabButton tab="provider" href={"/app/provider-config"}>
                    <IonIcon icon={calendar}/>
                    <IonLabel>Schedule</IonLabel>
                    {/*<IonBadge>6</IonBadge>*/}
                </IonTabButton>

                <IonTabButton tab="trace" href={"/app/trace"}>
                    <IonIcon icon={personCircle}/>
                    <IonLabel>Speakers</IonLabel>
                </IonTabButton>

                <IonTabButton tab="client" href={"/app/client"}>
                    <IonIcon icon={map}/>
                    <IonLabel>Map</IonLabel>
                </IonTabButton>

                <IonTabButton tab="about">
                    <IonIcon icon={informationCircle}/>
                    <IonLabel>About</IonLabel>
                </IonTabButton>

            </IonTabBar>

        </IonTabs>


    );
}