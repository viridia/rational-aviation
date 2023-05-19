import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { GraphView } from '../components/graph/GraphView';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';
import { layoutRandom } from '../store';

const Tab1: React.FC = () => {
  const { t } = useTranslation('app');
  const dispatch = useAppDispatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('graphView')}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dispatch(layoutRandom());
              }}
            >
              Randomize
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphView />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
