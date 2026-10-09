
const servicesData = [
  { id: 1, category: 'hygiene', name: 'Чистка зубів', price: '1200 грн', desc: 'Професійна ультразвукова чистка та AirFlow.' },
  { id: 2, category: 'therapy', name: 'Лікування чутливості ясен', price: '950 грн', desc: 'Комплексне лікування та зняття запалення ясен.' },
  { id: 3, category: 'therapy', name: 'Видалення зубу', price: '1500 грн', desc: 'Безболісне хірургічне видалення різного ступеня складності.' },
  { id: 4, category: 'general', name: 'Консультація', price: '400 грн', desc: 'Огляд порожнини рота та складання плану лікування.' },
  { id: 5, category: 'therapy', name: 'Лікування карієсу', price: '1100 грн', desc: 'Пломбування сучасними фотополімерними матеріалами.' },
  { id: 6, category: 'orthodontics', name: 'Встановлення брекет-системи', price: '18000 грн', desc: 'Вирівнювання прикусу за допомогою металевих або керамічних брекетів.' },
  { id: 7, category: 'pediatric', name: 'Дитячий профілактичний огляд', price: '350 грн', desc: 'Дбайливий огляд дитячих зубів та фторування.' }
];

const doctorsData = [
  { id: 1, name: 'Володимир Анатолійович', role: 'пародонтолог', allowedServices: ['Лікування чутливості ясен', 'Консультація'] },
  { id: 2, name: 'Олена Іванівна', role: 'терапевт', allowedServices: ['Чистка зубів', 'Лікування карієсу', 'Видалення зубу', 'Консультація'] },
  { id: 3, name: 'Михайло Сергійович', role: 'ортодонт', allowedServices: ['Встановлення брекет-системи', 'Консультація'] },
  { id: 4, name: 'Анна Петрівна', role: 'дитячий стоматолог', allowedServices: 'Дитячий профілактичний огляд'}
];

const datesData = ['25.09', '29.09', '02.10'];
const timesData = ['10:00', '12:30', '15:30', '18:00'];

let bookedSlots = []; 
let appointmentsList = [];

let bookingState = {
  service: null,
  doctor: null,
  date: null,
  time: null,
  patientName: '',
  patientPhone: ''
};

let activeStep = 1;

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage(); 
  renderCatalog('all');
  initEvents();
  renderModalServices();
});

function renderCatalog(category) {
  const container = document.getElementById('services-grid');
  container.innerHTML = '';

  const filtered = servicesData.filter(s => {
    
    if (category === 'pediatric') {
      return s.category === 'pediatric';
    }

    if (category === 'all') {
      return true;
    }

    return s.category === category || s.name === 'Консультація';
  });

  filtered.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div>
        <div class="service-card-title">${service.name}</div>
        <div class="service-card-price">${service.price}</div>
        <div class="service-card-desc">${service.desc}</div>
      </div>
      <button class="btn btn-secondary" onclick="quickSelectService('${service.name}')">Обрати для запису</button>
    `;
    container.appendChild(card);
  });
}

function renderModalServices() {
  const container = document.getElementById('modal-services-list');
  container.innerHTML = '';

  servicesData.forEach(service => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-service-choice';
    if (bookingState.service === service.name) {
      btn.classList.add('selected');
    }
    btn.innerHTML = `
      <span>${service.name}</span>
      <small style="color: var(--text-muted);">${service.price}</small>
    `;
    btn.onclick = () => selectService(service.name, btn);
    container.appendChild(btn);
  });
}

function selectService(serviceName, element) {
  
  if (bookingState.service !== serviceName) {
    bookingState.service = serviceName;
    bookingState.doctor = null; 
  }

  document.querySelectorAll('.btn-service-choice').forEach(b => b.classList.remove('selected'));
  if (element) element.classList.add('selected');

  document.getElementById('to-step-2-btn').disabled = false;
}

function quickSelectService(serviceName) {
  openModal();
  selectService(serviceName);
  renderModalServices();
}

function toggleCustomDropdown() {
  const dropdown = document.getElementById('custom-doctor-dropdown');
  const menu = document.getElementById('dropdown-menu-list');
  
  dropdown.classList.toggle('open');
  menu.classList.toggle('hidden');
}

function closeCustomDropdown() {
  const dropdown = document.getElementById('custom-doctor-dropdown');
  const menu = document.getElementById('dropdown-menu-list');
  
  if (dropdown && menu) {
    dropdown.classList.remove('open');
    menu.classList.add('hidden');
  }
}


function setupStep2() {
  const menuContainer = document.getElementById('dropdown-menu-list');
  const selectedText = document.getElementById('selected-doctor-text');
  
  menuContainer.innerHTML = ''; 
 
  if (bookingState.doctor) {
    selectedText.textContent = bookingState.doctor;
  } else {
    selectedText.textContent = '-- Оберіть лікаря --';
  }

  const filteredDoctors = doctorsData.filter(doc => 
    doc.allowedServices.includes(bookingState.service)
  );

  filteredDoctors.forEach(doc => {
    const doctorString = `${doc.name} (${doc.role})`;
    const optionDiv = document.createElement('div');
    optionDiv.className = `dropdown-option ${bookingState.doctor === doctorString ? 'selected' : ''}`;
    optionDiv.textContent = `${doc.name} — ${doc.role}`;

    optionDiv.onclick = () => {
      bookingState.doctor = doctorString;
      selectedText.textContent = `${doc.name} — ${doc.role}`;
      
      closeCustomDropdown();

      document.getElementById('to-step-3-btn').disabled = false;
    };

    menuContainer.appendChild(optionDiv);
  });

  document.getElementById('to-step-3-btn').disabled = !bookingState.doctor;
}

function setupStep3() {
  const datesContainer = document.getElementById('dates-container');
  datesContainer.innerHTML = '';

  datesData.forEach(d => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `slot-btn ${bookingState.date === d ? 'selected' : ''}`;
    btn.textContent = d;
    btn.onclick = () => selectDate(d, btn);
    datesContainer.appendChild(btn);
  });

  if (bookingState.date) {
    renderTimeSlots(bookingState.date);
  } else {
    document.getElementById('time-selection-block').classList.add('hidden');
  }

  document.getElementById('to-step-4-btn').disabled = !(bookingState.date && bookingState.time);
}

function selectDate(date, btnElement) {
  bookingState.date = date;
  bookingState.time = null; 

  document.querySelectorAll('#dates-container .slot-btn').forEach(b => b.classList.remove('selected'));
  btnElement.classList.add('selected');

  document.getElementById('selected-date-label').textContent = date;
  document.getElementById('time-selection-block').classList.remove('hidden');

  renderTimeSlots(date);
  document.getElementById('to-step-4-btn').disabled = true;
}

function renderTimeSlots(date) {
  const timesContainer = document.getElementById('times-container');
  timesContainer.innerHTML = '';

  timesData.forEach(t => {
    const btn = document.createElement('button');
    btn.type = 'button';
    
    const isBooked = bookedSlots.some(slot => slot.date === date && slot.time === t);

    btn.className = `slot-btn ${bookingState.time === t ? 'selected' : ''} ${isBooked ? 'disabled' : ''}`;
    btn.textContent = t;

    if (isBooked) {
      btn.disabled = true;
      btn.title = 'Цей час вже зайнятий';
    } else {
      btn.onclick = () => selectTime(t, btn);
    }

    timesContainer.appendChild(btn);
  });
}

function selectTime(time, btnElement) {
  bookingState.time = time;
  document.querySelectorAll('#times-container .slot-btn').forEach(b => b.classList.remove('selected'));
  btnElement.classList.add('selected');

  document.getElementById('to-step-4-btn').disabled = false;
}

function setupStep4() {
  const summary = document.getElementById('booking-summary');
  summary.innerHTML = `
    <strong>Підсумок запису:</strong><br>
    • <strong>Послуга:</strong> ${bookingState.service}<br>
    • <strong>Лікар:</strong> ${bookingState.doctor}<br>
    • <strong>Дата та час:</strong> ${bookingState.date}, о ${bookingState.time}
  `;
}

function goToStep(stepNumber) {
  activeStep = stepNumber;

  document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${stepNumber}`).classList.add('active');

  document.querySelectorAll('.step-item').forEach(item => {
    const s = parseInt(item.getAttribute('data-step'));
    item.classList.toggle('active', s === stepNumber);
  });

  if (stepNumber === 2) setupStep2();
  if (stepNumber === 3) setupStep3();
  if (stepNumber === 4) setupStep4();
}

function handleBookingSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('patient-name');
  const phoneInput = document.getElementById('patient-phone');
  
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');

  let isValid = true;

  if (!nameInput.value.trim()) {
    nameError.style.display = 'block';
    isValid = false;
  } else {
    nameError.style.display = 'none';
  }

  const phoneRegex = /^\+?[0-9]{10,12}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
  }

  if (!isValid) return;

  bookingState.patientName = nameInput.value.trim();
  bookingState.patientPhone = phoneInput.value.trim();

  const newSlot = { date: bookingState.date, time: bookingState.time };
  bookedSlots.push(newSlot);

  const newAppointment = {
    id: Date.now(), 
    patientName: bookingState.patientName,
    patientPhone: bookingState.patientPhone,
    doctor: bookingState.doctor,
    service: bookingState.service,
    date: bookingState.date,
    time: bookingState.time
  };

  appointmentsList.push(newAppointment);

  saveToLocalStorage();

  alert('Призначено запис!');

  renderSavedAppointments();
  closeModal();
  resetForm();
}

function addAppointmentCardDOM(data) {
  const list = document.getElementById('appointments-list');

  const card = document.createElement('div');
  card.className = 'appointment-card';
  card.innerHTML = `
    <h3>Запис на прийом</h3>
    <div class="appointment-info">
      <div><strong>Пацієнт:</strong> ${data.patientName} (${data.patientPhone})</div>
      <div><strong>Лікар:</strong> ${data.doctor}</div>
      <div><strong>Назва послуги:</strong> ${data.service}</div>
      <div><strong>Дата та час візиту:</strong> ${data.date}, ${data.time}</div>
    </div>
    <button class="btn btn-danger btn-sm" onclick="cancelAppointment(${data.id}, '${data.date}', '${data.time}')">Видалити запис</button>
  `;

  list.appendChild(card);
}

function cancelAppointment(id, date, time) {
  alert('Скасовано запис');

  bookedSlots = bookedSlots.filter(slot => !(slot.date === date && slot.time === time));

  appointmentsList = appointmentsList.filter(app => app.id !== id);

  saveToLocalStorage();

  renderSavedAppointments();
}

function openModal() {
  document.getElementById('booking-modal').classList.add('active');
  goToStep(1);
}

function closeModal() {
  document.getElementById('booking-modal').classList.remove('active');
}

function resetForm() {
  bookingState = {
    service: null,
    doctor: null,
    date: null,
    time: null,
    patientName: '',
    patientPhone: ''
  };
  document.getElementById('patient-form').reset();
  renderModalServices();
}

function initEvents() {

  document.getElementById('categories-filter').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCatalog(e.target.dataset.category);
    }
  });

  document.getElementById('open-booking-btn').addEventListener('click', openModal);

  document.getElementById('booking-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  document.getElementById('dropdown-selected-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCustomDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#custom-doctor-dropdown')) {
      closeCustomDropdown();
    }
  });

  document.getElementById('to-step-2-btn').addEventListener('click', () => goToStep(2));
  document.getElementById('back-to-step-1').addEventListener('click', () => goToStep(1));

  document.getElementById('to-step-3-btn').addEventListener('click', () => goToStep(3));
  document.getElementById('back-to-step-2').addEventListener('click', () => goToStep(2));

  document.getElementById('to-step-4-btn').addEventListener('click', () => goToStep(4));
  document.getElementById('back-to-step-3').addEventListener('click', () => goToStep(3));

  document.getElementById('patient-form').addEventListener('submit', handleBookingSubmit);
}


function saveToLocalStorage() {
  localStorage.setItem('dental_booked_slots', JSON.stringify(bookedSlots));
  localStorage.setItem('dental_appointments', JSON.stringify(appointmentsList));
}

function loadFromLocalStorage() {
  const savedSlots = localStorage.getItem('dental_booked_slots');
  const savedAppointments = localStorage.getItem('dental_appointments');

  if (savedSlots) {
    bookedSlots = JSON.parse(savedSlots);
  }

  if (savedAppointments) {
    appointmentsList = JSON.parse(savedAppointments);
    renderSavedAppointments();
  }
}

function renderSavedAppointments() {
  const list = document.getElementById('appointments-list');
  list.innerHTML = '';

  if (appointmentsList.length === 0) {
    list.innerHTML = '<p class="no-appointments">У вас поки немає активних записів.</p>';
    return;
  }

  appointmentsList.forEach(data => {
    addAppointmentCardDOM(data);
  });
}

