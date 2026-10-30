import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme.js';

export const Header = React.memo(({ currentView, setCurrentView, onStartBooking }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.logoWrapper}
                onPress={() => setCurrentView('home')}
                activeOpacity={0.7}
            >
                <View style={styles.logoBadge}>
                    <Text style={styles.logoIcon}>🦷</Text>
                </View>
                <View>
                    <Text style={styles.title}>DentalClinic</Text>
                    <Text style={styles.subtitle}>Стоматологічна клініка</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.actionsWrapper}>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => onStartBooking(null)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.bookButtonText}>Записатися</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.iconNavButton,
                        currentView === 'appointments' && styles.iconNavButtonActive
                    ]}
                    onPress={() => setCurrentView('appointments')}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.iconNavText,
                        currentView === 'appointments' && styles.iconNavTextActive
                    ]}>
                        👤
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoBadge: {
        width: 38,
        height: 38,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.bgCard,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textMain,
    },
    subtitle: {
        fontSize: 10,
        color: theme.colors.textMuted,
    },
    actionsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bookButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: theme.radii.md,
    },
    bookButtonText: {
        color: theme.colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    iconNavButton: {
        padding: 8,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
    },
    iconNavButtonActive: {
        backgroundColor: theme.colors.activeBg,
        borderColor: 'transparent',
    },
    iconNavText: {
        fontSize: 14,
        color: theme.colors.textMain,
    },
    iconNavTextActive: {
        color: theme.colors.primary,
    },
});