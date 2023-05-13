import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GraphView } from '../components/graph/GraphView';
import { useTranslation } from 'react-i18next';

const Tab1: React.FC = () => {
  const { t } = useTranslation('app');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('graphView')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphView />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
