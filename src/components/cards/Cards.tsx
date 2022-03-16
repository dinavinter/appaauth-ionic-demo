import React, {useState, useCallback, useContext} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonButton,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol, IonModal, useIonModal, IonPopover, useIonPopover
} from '@ionic/react';


import {useAuthState} from "../../services/authState";
import {JsonCard} from "../json-card/JsonTreeViewer";

const Home = () => {
    // const { state } = useContext(AppContext);

    const {action, history, user, providerConfig, clientConfig, session} = useAuthState();
    const [present, dismiss] = useIonPopover(PopoverList, {
        onHide: () => dismiss(),
    });

    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    });
    const data = [
        {
            data: providerConfig,
            title: "Provider Config"
        },
        {
            data: clientConfig,
            title: "Client Config"
        },
        {
            data: session,
            title: "Session"
        },
        {
            data: user,
            title: "User Info"
        },
    ]

    function doPlay(track: { data: any; title: string }) {

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Music</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonGrid>
                    <IonRow>
                        <IonCol
                            size={"xl"}
                            className="new-track">
                            <IonList>
                                <IonListHeader>
                                    <IonLabel>Trace</IonLabel>
                                </IonListHeader>
                                {history.map(action => (
                                    <IonItem key={action.action} button>
                                        <IonLabel>
                                            <JsonCard data={action} title={action.action}/>
                                        </IonLabel>
                                    </IonItem>
                                ))}

                            </IonList>
                        </IonCol>
                    </IonRow>
                   
                    <IonRow>
                        {data.map(track => (
                            <IonCol
                                size={"md"}
                                className="new-track"
                                key={track.title}
                            >
                                {/*<IonButton >*/}
                                {/*    track.title*/}
                                {/*</IonButton>*/}
                                <Item key={track.title} data={track.data} title={track.title} show={true}/>
                            </IonCol>
                        ))}
                    </IonRow>
                    
                    <IonRow>
                        <IonButton
                            expand="block"
                            onClick={(e) =>
                                present({
                                    event: e.nativeEvent,
                                    
                                })
                            }
                        >
                            Show Popover
                        </IonButton>
                    </IonRow>
                    
                 
                </IonGrid>
            
            </IonContent>
            <aside>
                <PopoverExample2 onHide={()=> setShowPopover({showPopover: false, event: undefined})}  show={popoverState.showPopover} event={popoverState.event}  />

            </aside>

            <PopoverExample />
            
            
            <IonItem key={"data"} button >
                <IonLabel>
                    <IonButton
                        onClick={(e: any) => {
                            e.persist();
                            setShowPopover({ showPopover: true, event: e });
                        }}
                    >
                        Show Popover3
                    </IonButton>
                </IonLabel>
            </IonItem>
        </IonPage>
    );
};


const Item: React.FC<{ data: any, show: true, title: any }> = ({data, title}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <IonItem key={title} button>
                <IonLabel>
                    <IonButton onClick={() => setShowModal(true)} expand="block">
                        {title}
                    </IonButton>
                </IonLabel>
            </IonItem>
          

            <IonPopover
                isOpen={showModal}
                showBackdrop={true}
                 
                onDidDismiss={() => setShowModal(false)}>
                <JsonCard data={data} title={title}/>
            </IonPopover>
            
            
        </>
    );
};
const PopoverList: React.FC<{
    onHide: () => void;
}> = ({ onHide }) => (
    <IonList>
        <IonListHeader>Ionic</IonListHeader>
        <IonItem button>Learn Ionic</IonItem>
        <IonItem button>Documentation</IonItem>
        <IonItem button>Showcase</IonItem>
        <IonItem button>GitHub Repo</IonItem>
        <IonItem lines="none" detail={false} button onClick={onHide}>
            Close
        </IonItem>
    </IonList>
);


export const PopoverExample: React.FC = () => {
    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    });

    return (
        <>
            <IonPopover
                cssClass="my-custom-class"
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
            >
                <p>This is popover content</p>
            </IonPopover>
            <IonButton
                onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                }}
            >
                Show Popover
            </IonButton>
        </>
    );
};
export const PopoverExample2: React.FC<{
    onHide: () => void;
    show: boolean,
    event?: Event
}> = ({show , event ,onHide }) => {


    return (
        <>
            <IonPopover
                cssClass="my-custom-class"
                // event={event}
                
                isOpen={show}
                onDidDismiss={() => onHide()}
            >
                <p>This is popover content</p>
            </IonPopover>
         
        </>
    );
};
export default Home;
