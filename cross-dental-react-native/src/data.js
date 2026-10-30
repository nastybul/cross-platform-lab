export const categoriesData = [
    { id: 'all', label: 'Усі послуги' },
    { id: 'therapy', label: 'Терапія' },
    { id: 'surgery', label: 'Хірургія' },
    { id: 'orthodontics', label: 'Ортодонтія' },
    { id: 'hygiene', label: 'Гігієна' },
];

export const servicesData = [
    { id: 1, category: 'hygiene', name: 'Професійна чистка зубів', price: '1200 грн' },
    { id: 2, category: 'hygiene', name: 'Лікування чутливості ясен', price: '950 грн' },
    { id: 3, category: 'surgery', name: 'Видалення зубу', price: '1500 грн' },
    { id: 4, category: 'therapy', name: 'Консультація та діагностика', price: '400 грн' },
    { id: 5, category: 'therapy', name: 'Лікування карієсу', price: '1100 грн' },
    { id: 6, category: 'orthodontics', name: 'Встановлення брекет-системи', price: '18000 грн' },
    { id: 7, category: 'therapy', name: 'Дитячий профілактичний огляд', price: '350 грн' },
];

export const doctorsData = [
    { id: 101, name: 'Д-р Мельник О.В.', role: 'Терапевт', allowedServices: ['Професійна чистка зубів', 'Консультація та діагностика', 'Лікування карієсу', 'Дитячий профілактичний огляд'] },
    { id: 102, name: 'Д-р Шевченко І.М.', role: 'Хірург-стоматолог', allowedServices: ['Видалення зубу', 'Консультація та діагностика'] },
    { id: 103, name: 'Д-р Бондаренко А.С.', role: 'Ортодонт', allowedServices: ['Встановлення брекет-системи', 'Консультація та діагностика'] },
    { id: 104, name: 'Д-р Ковальчук Т.П.', role: 'Пародонтолог', allowedServices: ['Професійна чистка зубів', 'Лікування чутливості ясен'] },
];

export const datesData = ['20 Жовтня', '21 Жовтня', '22 Жовтня', '23 Жовтня', '24 Жовтня'];
export const timesData = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'];