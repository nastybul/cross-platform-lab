import { Wrapper, Title, EmptyText, ListWrapper } from './AppointmentsView.styles.js';
import { AppointmentItem } from './AppointmentItem.jsx';

export const AppointmentsView = ({ appointmentsList, onCancelAppointment }) => {
  return (
    <Wrapper>
      <Title>Мої записи на прийом</Title>
      {appointmentsList.length === 0 ? (
        <EmptyText>У вас поки немає активних записів.</EmptyText>
      ) : (
        <ListWrapper>
          {appointmentsList.map(app => (
            <AppointmentItem 
              key={app.id} 
              app={app} 
              onCancel={onCancelAppointment} 
            />
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};