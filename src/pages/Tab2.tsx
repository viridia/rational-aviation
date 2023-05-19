import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { HGraphView } from '../components/graph/HGraphView';
import { layoutRandom } from '../store';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';

const Tab2: React.FC = () => {
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
        <HGraphView />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
