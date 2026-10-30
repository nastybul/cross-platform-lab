import React, { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { categoriesData, servicesData } from '../data.js';
import { theme } from '../styles/theme.js';

export const HomeView = React.memo(({ selectedCategory, setSelectedCategory, onSelectService }) => {
    const filteredServices = React.useMemo(() => {
        if (selectedCategory === 'all') return servicesData;
        return servicesData.filter(s => s.category === selectedCategory);
    }, [selectedCategory]);

    const renderCategoryItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(item.id)}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.categoryText,
                selectedCategory === item.id && styles.categoryTextActive
            ]}>
                {item.label}
            </Text>
        </TouchableOpacity>
    ), [selectedCategory, setSelectedCategory]);

    const renderServiceCard = useCallback(({ item }) => (
        <View style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => onSelectService(item.name)}
                activeOpacity={0.8}
            >
                <Text style={styles.selectButtonText}>Записатися</Text>
            </TouchableOpacity>
        </View>
    ), [onSelectService]);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Наші послуги</Text>

            {/* Горизонтальний список категорій */}
            <View style={styles.categoriesWrapper}>
                <FlatList
                    horizontal
                    data={categoriesData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCategoryItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {/* Вертикальний список послуг */}
            <FlatList
                data={filteredServices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderServiceCard}
                scrollEnabled={false}
                contentContainerStyle={styles.servicesList}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.textMain,
    },
    categoriesWrapper: {
        marginHorizontal: -16,
    },
    categoriesList: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    categoryChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    categoryText: {
        fontSize: 13,
        color: theme.colors.textMain,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    servicesList: {
        gap: 12,
    },
    serviceCard: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textMain,
        marginBottom: 4,
    },
    servicePrice: {
        fontSize: 14,
        color: theme.colors.textMuted,
    },
    selectButton: {
        backgroundColor: theme.colors.bgCard,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    selectButtonText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
});