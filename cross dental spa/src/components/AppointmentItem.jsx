import { AppointmentCard, CardHeader, DetailsGrid, DeleteButton } from './AppointmentsView.styles.js';

export const AppointmentItem = ({ app, onCancel }) => {
  return (
    <AppointmentCard>
      <div>
        <CardHeader>Запис на прийом</CardHeader>
        <DetailsGrid>
          <div><strong>Пацієнт:</strong> {app.patientName} ({app.patientPhone})</div>
          <div><strong>Лікар:</strong> {app.doctor}</div>
          <div><strong>Назва послуги:</strong> {app.service}</div>
          <div><strong>Дата та час візиту:</strong> {app.date}, о {app.time}</div>
        </DetailsGrid>
      </div>
      <DeleteButton onClick={() => onCancel(app.id)}>
        Видалити запис
      </DeleteButton>
    </AppointmentCard>
  );
};