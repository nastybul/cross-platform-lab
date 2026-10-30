import React, { useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AppointmentItem } from './AppointmentItem.jsx';
import { theme } from '../styles/theme.js';

export const AppointmentsView = React.memo(({ appointmentsList, onCancelAppointment }) => {
    const renderItem = useCallback(({ item }) => (
        <AppointmentItem app={item} onCancel={onCancelAppointment} />
    ), [onCancelAppointment]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мої записи на прийом</Text>

            {appointmentsList.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>У вас поки немає активних записів.</Text>
                </View>
            ) : (
                <FlatList
                    data={appointmentsList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.textMain,
    },
    emptyBox: {
        backgroundColor: theme.colors.white,
        padding: 24,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.textMuted,
        fontSize: 14,
    },
    listContainer: {
        gap: 12,
    },
});