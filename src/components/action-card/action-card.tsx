import React from 'react';
import { IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import {JsonView} from "../json-card";

export const ActionCard = (props : any) => {

    return (
        <IonCard>
            <IonCardHeader>Action Data</IonCardHeader>
            <IonCardContent>
                <JsonView  data={props.action} /> 
            </IonCardContent>
        </IonCard>
    );
}