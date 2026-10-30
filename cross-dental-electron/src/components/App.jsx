import { useState, useEffect } from 'react';
import { servicesData, doctorsData, datesData, timesData } from '../data.js';
import { Header } from './Header.jsx';
import { HomeView } from './HomeView.jsx';
import { AppointmentsView } from './AppointmentsView.jsx';
import { 
  BookingCard, StepsHeader, StepItem, StepNumber, StepLabel, StepTitle, StepDescription, 
  OptionButton, ButtonGroup, SecondaryButton, PrimaryButton, SelectBox, 
  DropdownList, DropdownItem, PillButton, InputField, ErrorText, SummaryBox, ToastContainer, 
  ToastItem, FooterWrapper, FooterContainer
} from './App.styles.js';

function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [appointmentsList, setAppointmentsList] = useState([]);
  useEffect(() => {
    async function fetchAppointments() {
      if (window.dentalAPI) {
        const saved = await window.dentalAPI.loadAppointments();
        setAppointmentsList(saved);
      } else {
        const saved = localStorage.getItem('dental_appointments');
        if (saved) setAppointmentsList(JSON.parse(saved));
      }
    }
    fetchAppointments();
  }, []);
  
  const [bookingState, setBookingState] = useState({
    service: null,
    doctor: null,
    date: null,
    time: null,
    patientName: '',
    patientPhone: ''
  });

  const [toasts, setToasts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [patientErrors, setPatientErrors] = useState({ name: false, phone: false });

  const bookedSlots = appointmentsList.map(app => ({ date: app.date, time: app.time }));

  useEffect(() => {
    if (window.dentalAPI) {
      window.dentalAPI.saveAppointments(appointmentsList);
    } else {
      localStorage.setItem('dental_appointments', JSON.stringify(appointmentsList));
    }
  }, [appointmentsList]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleStartBooking = (serviceName = null) => {
    setBookingState(prev => ({
      ...prev,
      service: serviceName || prev.service,
      doctor: serviceName && !doctorsData.find(d => d.allowedServices.includes(serviceName) && d.name === prev.doctor) ? null : prev.doctor
    }));
    setBookingStep(1);
    setCurrentView('booking');
  };

  const handleCancelAppointment = (id) => {
    setAppointmentsList(prev => prev.filter(app => app.id !== id));
    addToast('Скасовано запис');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const nameVal = bookingState.patientName.trim();
    const phoneVal = bookingState.patientPhone.trim();
    const phoneRegex = /^\+?[0-9]{10,12}$/;

    const nameErr = !nameVal;
    const phoneErr = !phoneRegex.test(phoneVal);

    setPatientErrors({ name: nameErr, phone: phoneErr });

    if (nameErr || phoneErr) return;

    const newApp = {
      id: Date.now(),
      patientName: nameVal,
      patientPhone: phoneVal,
      doctor: bookingState.doctor,
      service: bookingState.service,
      date: bookingState.date,
      time: bookingState.time
    };

    setAppointmentsList(prev => [...prev, newApp]);

    addToast('Призначено запис!');
    setBookingState({ service: null, doctor: null, date: null, time: null, patientName: '', patientPhone: '' });
    setCurrentView('appointments');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer>
        {toasts.map(toast => (
          <ToastItem key={toast.id} className="toast-notification">
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            <span>{toast.message}</span>
          </ToastItem>
        ))}
      </ToastContainer>

      <Header currentView={currentView} setCurrentView={setCurrentView} onStartBooking={() => handleStartBooking()} />

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        {currentView === 'home' && (
          <HomeView 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            onSelectService={handleStartBooking} 
          />
        )}

        {currentView === 'booking' && (
          <BookingCard>
            <StepsHeader>
              {[
                { step: 1, label: 'Послуга' },
                { step: 2, label: 'Лікар' },
                { step: 3, label: 'Дата/Час' },
                { step: 4, label: 'Контакти' }
              ].map(s => (
                <StepItem key={s.step} $isActive={bookingStep === s.step}>
                  <StepNumber $isActive={bookingStep === s.step}>{s.step}</StepNumber>
                  <StepLabel>{s.label}</StepLabel>
                </StepItem>
              ))}
            </StepsHeader>

            {bookingStep === 1 && (
              <div>
                <StepTitle>Крок 1: Вибір послуги</StepTitle>
                <StepDescription>Оберіть необхідну процедуру зі списку нижче:</StepDescription>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {servicesData.map(service => (
                    <OptionButton
                      key={service.id}
                      type="button"
                      $isSelected={bookingState.service === service.name}
                      onClick={() => setBookingState(prev => ({ ...prev, service: service.name, doctor: null }))}
                    >
                      <span style={{ fontWeight: '600', fontSize: '14px'}}>{service.name}</span>
                      <small style={{ fontSize: '14px', color: 'inherit', opacity: 0.8 }}>{service.price}</small>
                    </OptionButton>
                  ))}
                </div>
                <ButtonGroup>
                  <SecondaryButton onClick={() => setCurrentView('home')}>На головну</SecondaryButton>
                  <PrimaryButton 
                    $disabled={!bookingState.service} 
                    disabled={!bookingState.service} 
                    onClick={() => setBookingStep(2)}
                  >
                    Далі
                  </PrimaryButton>
                </ButtonGroup>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <StepTitle>Крок 2: Вибір лікаря</StepTitle>
                <StepDescription>Оберіть спеціаліста для обраної послуги:</StepDescription>
                
                <div style={{ marginBottom: '32px', position: 'relative' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Лікар:</label>
                  <div style={{ position: 'relative' }}>
                    <SelectBox type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <span style={{ fontWeight: '600', fontSize: '14px'}}>{bookingState.doctor || ' Оберіть лікаря'}</span>
                      <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                    </SelectBox>
                    {dropdownOpen && (
                      <DropdownList>
                        {doctorsData
                          .filter(doc => doc.allowedServices.includes(bookingState.service))
                          .map(doc => {
                            const docStr = `${doc.name} (${doc.role})`;
                            return (
                              <DropdownItem
                                key={doc.id}
                                $isSelected={bookingState.doctor === docStr}
                                onClick={() => {
                                  setBookingState(prev => ({ ...prev, doctor: docStr }));
                                  setDropdownOpen(false);
                                }}
                              >
                                {doc.name} — {doc.role}
                              </DropdownItem>
                            );
                          })}
                      </DropdownList>
                    )}
                  </div>
                </div>

                <ButtonGroup>
                  <SecondaryButton onClick={() => setBookingStep(1)}>Назад</SecondaryButton>
                  <PrimaryButton 
                    $disabled={!bookingState.doctor} 
                    disabled={!bookingState.doctor} 
                    onClick={() => setBookingStep(3)}
                  >
                    Далі
                  </PrimaryButton>
                </ButtonGroup>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <StepTitle>Крок 3: Вибір дати та часу</StepTitle>
                <StepDescription>Спочатку оберіть дату, а потім доступний час:</StepDescription>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px' }}>Доступні дати:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {datesData.map(d => (
                      <PillButton
                        key={d}
                        type="button"
                        $isSelected={bookingState.date === d}
                        onClick={() => setBookingState(prev => ({ ...prev, date: d, time: null }))}
                      >
                        {d}
                      </PillButton>
                    ))}
                  </div>
                </div>

                {bookingState.date && (
                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px' }}>Доступний час на {bookingState.date}:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {timesData.map(t => {
                        const isBooked = bookedSlots.some(slot => slot.date === bookingState.date && slot.time === t);
                        return (
                          <PillButton
                            key={t}
                            type="button"
                            $disabled={isBooked}
                            disabled={isBooked}
                            $isStrikethrough={isBooked}$isSelected={bookingState.time === t}
                            onClick={() => setBookingState(prev => ({ ...prev, time: t }))}
                          >
                            {t}
                          </PillButton>
                        );
                      })}
                    </div>
                  </div>
                )}

                <ButtonGroup>
                  <SecondaryButton onClick={() => setBookingStep(2)}>Назад</SecondaryButton>
                  <PrimaryButton 
                    $disabled={!(bookingState.date && bookingState.time)} 
                    disabled={!(bookingState.date && bookingState.time)} 
                    onClick={() => setBookingStep(4)}
                  >
                    Далі
                  </PrimaryButton>
                </ButtonGroup>
              </div>
            )}

            {bookingStep === 4 && (
              <form onSubmit={handleBookingSubmit}>
                <StepTitle>Крок 4: Контактні дані пацієнта</StepTitle>
                <StepDescription>Введіть ваші дані для підтвердження бронювання:</StepDescription>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>ПІБ / Ім'я пацієнта <span style={{ color: '#ef4444' }}>*</span></label>
                  <InputField
                    type="text"
                    value={bookingState.patientName}
                    onChange={(e) => setBookingState(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Наприклад: Олена Коваленко"
                  />
                  {patientErrors.name && <ErrorText>Будь ласка, вкажіть ваше ім'я</ErrorText>}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Номер телефону <span style={{ color: '#ef4444' }}>*</span></label>
                  <InputField
                    type="tel"
                    value={bookingState.patientPhone}
                    onChange={(e) => setBookingState(prev => ({ ...prev, patientPhone: e.target.value }))}
                    placeholder="+380XXXXXXXXX"
                  />
                  {patientErrors.phone && <ErrorText>Введіть коректний номер (наприклад, +380971234567)</ErrorText>}
                </div>

                <SummaryBox>
                  <strong>Підсумок запису:</strong><br/>
                  • <strong>Послуга:</strong> {bookingState.service}<br/>
                  • <strong>Лікар:</strong> {bookingState.doctor}<br/>
                  • <strong>Дата та час:</strong> {bookingState.date}, о {bookingState.time}
                </SummaryBox>

                <ButtonGroup>
                  <SecondaryButton type="button" onClick={() => setBookingStep(3)}>Назад</SecondaryButton>
                  <PrimaryButton type="submit">Забронювати</PrimaryButton>
                </ButtonGroup>
              </form>
            )}
          </BookingCard>
        )}

        {currentView === 'appointments' && (
          <AppointmentsView 
            appointmentsList={appointmentsList} 
            onCancelAppointment={handleCancelAppointment} 
          />
        )}
      </main>

      <FooterWrapper>
        <FooterContainer>
          <p>Крос-платформне програмування, лабораторна робота № 6</p>
          <p>Тема проєкту: Розробка застосунку для стоматологічної клініки</p>
          <p>Виконала: Булавіна А.</p>
        </FooterContainer>
      </FooterWrapper>
    </div>
  );
}

export default App;