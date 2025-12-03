import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const PrimaryButton = ({ title, onPress, disabled = false, loading = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    disabled: {
        backgroundColor: '#bdc3c7',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PrimaryButton;