import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GraphView } from '../components/graph/GraphView';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Graph View</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphView />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
