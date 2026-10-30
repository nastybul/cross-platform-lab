import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { servicesData, doctorsData, datesData, timesData } from './src/data.js';
import { Header } from './src/components/Header.jsx';
import { HomeView } from './src/components/HomeView.jsx';
import { AppointmentsView } from './src/components/AppointmentsView.jsx';
import { theme } from './src/styles/theme.js';

export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [appointmentsList, setAppointmentsList] = useState([]);

    const [bookingState, setBookingState] = useState({
        service: null,
        doctor: null,
        date: null,
        time: null,
        patientName: '',
        patientPhone: ''
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [patientErrors, setPatientErrors] = useState({ name: false, phone: false });

    // КЕШУВАННЯ: розрахунок заброньованих слотів
    const bookedSlots = useMemo(() => {
        return appointmentsList.map(app => ({ date: app.date, time: app.time }));
    }, [appointmentsList]);

    // КЕШУВАННЯ: функцій через useCallback
    const handleStartBooking = useCallback((serviceName = null) => {
        setBookingState(prev => ({
            ...prev,
            service: serviceName || prev.service,
            doctor: serviceName && !doctorsData.find(d => d.allowedServices.includes(serviceName) && d.name === prev.doctor) ? null : prev.doctor
        }));
        setBookingStep(1);
        setCurrentView('booking');
    }, []);

    const handleCancelAppointment = useCallback((id) => {
        setAppointmentsList(prev => prev.filter(app => app.id !== id));
        Alert.alert('Сповіщення', 'Запис скасовано');
    }, []);

    const handleBookingSubmit = useCallback(() => {
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
        Alert.alert('Успіх', 'Призначено запис!');
        setBookingState({ service: null, doctor: null, date: null, time: null, patientName: '', patientPhone: '' });
        setCurrentView('appointments');
    }, [bookingState]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <Header
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    onStartBooking={handleStartBooking}
                />

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {currentView === 'home' && (
                        <HomeView
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            onSelectService={handleStartBooking}
                        />
                    )}

                    {currentView === 'appointments' && (
                        <AppointmentsView
                            appointmentsList={appointmentsList}
                            onCancelAppointment={handleCancelAppointment}
                        />
                    )}

                    {currentView === 'booking' && (
                        <View style={styles.bookingCard}>
                            {/* Індикатор кроків */}
                            <View style={styles.stepsHeader}>
                                {['Послуга', 'Лікар', 'Дата/Час', 'Контакти'].map((label, idx) => {
                                    const stepNum = idx + 1;
                                    const isActive = bookingStep === stepNum;
                                    return (
                                        <View key={stepNum} style={styles.stepItem}>
                                            <View style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
                                                <Text style={[styles.stepNumberText, isActive && styles.stepNumberTextActive]}>
                                                    {stepNum}
                                                </Text>
                                            </View>
                                            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
                                                {label}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>

                            {/* КРОК 1 */}
                            {bookingStep === 1 && (
                                <View style={styles.stepBlock}>
                                    <Text style={styles.stepTitle}>Крок 1: Вибір послуги</Text>
                                    <Text style={styles.stepDesc}>Оберіть необхідну процедуру зі списку:</Text>

                                    <View style={styles.optionsList}>
                                        {servicesData.map(service => {
                                            const isSelected = bookingState.service === service.name;
                                            return (
                                                <TouchableOpacity
                                                    key={service.id}
                                                    style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                                                    onPress={() => setBookingState(prev => ({ ...prev, service: service.name, doctor: null }))}
                                                    activeOpacity={0.7}
                                                >
                                                    <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                                                        {service.name}
                                                    </Text>
                                                    <Text style={styles.optionPrice}>{service.price}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentView('home')}>
                                            <Text style={styles.secondaryText}>На головну</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.primaryButton, !bookingState.service && styles.buttonDisabled]}
                                            disabled={!bookingState.service}
                                            onPress={() => setBookingStep(2)}
                                        >
                                            <Text style={styles.primaryText}>Далі</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {/* КРОК 2 */}
                            {bookingStep === 2 && (
                                <View style={styles.stepBlock}>
                                    <Text style={styles.stepTitle}>Крок 2: Вибір лікаря</Text>
                                    <Text style={styles.stepDesc}>Оберіть спеціаліста:</Text>

                                    <TouchableOpacity
                                        style={styles.selectBox}
                                        onPress={() => setDropdownOpen(!dropdownOpen)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.selectBoxText}>
                                            {bookingState.doctor || '-- Оберіть лікаря --'}
                                        </Text>
                                        <Text style={styles.selectBoxText}>▼</Text>
                                    </TouchableOpacity>

                                    {dropdownOpen && (
                                        <View style={styles.dropdownContainer}>
                                            {doctorsData
                                                .filter(doc => doc.allowedServices.includes(bookingState.service))
                                                .map(doc => {
                                                    const docStr = `${doc.name} (${doc.role})`;
                                                    const isSel = bookingState.doctor === docStr;
                                                    return (
                                                        <TouchableOpacity
                                                            key={doc.id}
                                                            style={[styles.dropdownItem, isSel && styles.dropdownItemSel]}
                                                            onPress={() => {
                                                                setBookingState(prev => ({ ...prev, doctor: docStr }));
                                                                setDropdownOpen(false);
                                                            }}
                                                        >
                                                            <Text style={[styles.dropdownText, isSel && styles.dropdownTextSel]}>
                                                                {doc.name} — {doc.role}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                        </View>
                                    )}

                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity style={styles.secondaryButton} onPress={() => setBookingStep(1)}>
                                            <Text style={styles.secondaryText}>Назад</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.primaryButton, !bookingState.doctor && styles.buttonDisabled]}
                                            disabled={!bookingState.doctor}
                                            onPress={() => setBookingStep(3)}
                                        >
                                            <Text style={styles.primaryText}>Далі</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {/* КРОК 3 */}
                            {bookingStep === 3 && (
                                <View style={styles.stepBlock}>
                                    <Text style={styles.stepTitle}>Крок 3: Дата та час</Text>
                                    <Text style={styles.stepDesc}>Оберіть дату й час прийому:</Text>

                                    <Text style={styles.subLabel}>Доступні дати:</Text>
                                    <View style={styles.pillsGrid}>
                                        {datesData.map(d => {
                                            const isSel = bookingState.date === d;
                                            return (
                                                <TouchableOpacity
                                                    key={d}
                                                    style={[styles.pill, isSel && styles.pillSel]}
                                                    onPress={() => setBookingState(prev => ({ ...prev, date: d, time: null }))}
                                                >
                                                    <Text style={[styles.pillText, isSel && styles.pillTextSel]}>{d}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    {bookingState.date && (
                                        <>
                                            <Text style={styles.subLabel}>Час на {bookingState.date}:</Text>
                                            <View style={styles.pillsGrid}>
                                                {timesData.map(t => {
                                                    const isBooked = bookedSlots.some(s => s.date === bookingState.date && s.time === t);
                                                    const isSel = bookingState.time === t;
                                                    return (
                                                        <TouchableOpacity
                                                            key={t}
                                                            disabled={isBooked}
                                                            style={[
                                                                styles.pill,
                                                                isSel && styles.pillSel,
                                                                isBooked && styles.pillDisabled
                                                            ]}
                                                            onPress={() => setBookingState(prev => ({ ...prev, time: t }))}
                                                        >
                                                            <Text style={[
                                                                styles.pillText,
                                                                isSel && styles.pillTextSel,
                                                                isBooked && styles.pillTextDisabled
                                                            ]}>
                                                                {t}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        </>
                                    )}

                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity style={styles.secondaryButton} onPress={() => setBookingStep(2)}>
                                            <Text style={styles.secondaryText}>Назад</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.primaryButton, !(bookingState.date && bookingState.time) && styles.buttonDisabled]}
                                            disabled={!(bookingState.date && bookingState.time)}
                                            onPress={() => setBookingStep(4)}
                                        >
                                            <Text style={styles.primaryText}>Далі</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {/* КРОК 4 */}
                            {bookingStep === 4 && (
                                <View style={styles.stepBlock}>
                                    <Text style={styles.stepTitle}>Крок 4: Контакти</Text>

                                    <Text style={styles.inputLabel}>ПІБ / Ім'я пацієнта *</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={bookingState.patientName}
                                        onChangeText={(text) => setBookingState(prev => ({ ...prev, patientName: text }))}
                                        placeholder="Олена Коваленко"
                                        placeholderTextColor={theme.colors.textMuted}
                                    />
                                    {patientErrors.name && <Text style={styles.errorText}>Вкажіть ваше ім'я</Text>}

                                    <Text style={styles.inputLabel}>Номер телефону *</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="phone-pad"
                                        value={bookingState.patientPhone}
                                        onChangeText={(text) => setBookingState(prev => ({ ...prev, patientPhone: text }))}
                                        placeholder="+380XXXXXXXXX"
                                        placeholderTextColor={theme.colors.textMuted}
                                    />
                                    {patientErrors.phone && <Text style={styles.errorText}>Введіть номер у форматі +380XXXXXXXXX</Text>}

                                    <View style={styles.summaryBox}>
                                        <Text style={styles.summaryTitle}>Підсумок запису:</Text>
                                        <Text style={styles.summaryLine}>• Послуга: {bookingState.service}</Text>
                                        <Text style={styles.summaryLine}>• Лікар: {bookingState.doctor}</Text>
                                        <Text style={styles.summaryLine}>• Дата та час: {bookingState.date}, {bookingState.time}</Text>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity style={styles.secondaryButton} onPress={() => setBookingStep(3)}>
                                            <Text style={styles.secondaryText}>Назад</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.primaryButton} onPress={handleBookingSubmit}>
                                            <Text style={styles.primaryText}>Забронювати</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.bgCard,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    bookingCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    stepsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: 12,
        marginBottom: 16,
    },
    stepItem: {
        alignItems: 'center',
        gap: 4,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    stepNumberText: {
        fontSize: 11,
        color: theme.colors.textMuted,
        fontWeight: 'bold',
    },
    stepNumberTextActive: {
        color: theme.colors.white,
    },
    stepLabel: {
        fontSize: 10,
        color: theme.colors.textMuted,
    },
    stepLabelActive: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    stepBlock: {
        gap: 12,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.textMain,
    },
    stepDesc: {
        fontSize: 13,
        color: theme.colors.textMuted,
    },
    optionsList: {
        gap: 8,
        marginVertical: 8,
    },
    optionButton: {
        padding: 14,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionButtonSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.bgCard,
    },
    optionTitle: {
        fontSize: 14,
        color: theme.colors.textMain,
        flex: 1,
    },
    optionTitleSelected: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    optionPrice: {
        fontSize: 12,
        color: theme.colors.textMuted,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    secondaryButton: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: theme.radii.md,
    },
    secondaryText: {
        color: theme.colors.textMain,
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: theme.radii.md,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    primaryText: {
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    selectBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    selectBoxText: {
        color: theme.colors.textMain,
        fontSize: 14,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.white,
        maxHeight: 150,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.bgCard,
    },
    dropdownItemSel: {
        backgroundColor: theme.colors.bgCard,
    },
    dropdownText: {
        fontSize: 13,
        color: theme.colors.textMain,
    },
    dropdownTextSel: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    subLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: theme.colors.textMain,
        marginTop: 8,
    },
    pillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 8,
    },
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
    },
    pillSel: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    pillDisabled: {
        opacity: 0.4,
        backgroundColor: '#F3F4F6',
    },
    pillText: {
        fontSize: 12,
        color: theme.colors.textMain,
    },
    pillTextSel: {
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    pillTextDisabled: {
        textDecorationLine: 'line-through',
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.textMain,
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        padding: 10,
        fontSize: 14,
        color: theme.colors.textMain,
    },
    errorText: {
        color: theme.colors.danger,
        fontSize: 11,
    },
    summaryBox: {
        backgroundColor: theme.colors.bgCard,
        padding: 12,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
        marginVertical: 12,
        gap: 4,
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 13,
        color: theme.colors.textMain,
    },
    summaryLine: {
        fontSize: 12,
        color: theme.colors.textMain,
    },
});