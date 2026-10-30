import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme.js';

export const AppointmentItem = React.memo(({ app, onCancel }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.serviceText}>{app.service}</Text>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => onCancel(app.id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.cancelText}>Скасувати</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.doctorText}>👨‍⚕️ {app.doctor}</Text>

            <View style={styles.detailsRow}>
                <Text style={styles.detailBadge}>📅 {app.date}</Text>
                <Text style={styles.detailBadge}>⏰ {app.time}</Text>
            </View>

            <View style={styles.patientRow}>
                <Text style={styles.patientText}>Пацієнт: {app.patientName} ({app.patientPhone})</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    serviceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textMain,
        flex: 1,
    },
    cancelButton: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: theme.radii.sm,
    },
    cancelText: {
        color: theme.colors.danger,
        fontSize: 12,
        fontWeight: '600',
    },
    doctorText: {
        fontSize: 14,
        color: theme.colors.textMuted,
    },
    detailsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    detailBadge: {
        fontSize: 12,
        backgroundColor: theme.colors.bgCard,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: theme.radii.sm,
        color: theme.colors.primary,
        fontWeight: '500',
    },
    patientRow: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 8,
        marginTop: 4,
    },
    patientText: {
        fontSize: 12,
        color: theme.colors.textMuted,
    },
});