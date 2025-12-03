import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    iconName,
    error,
    secureTextEntry = false,
    keyboardType = 'default',
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.errorBorder]}>
                {iconName && (
                    <Ionicons name={iconName} size={20} color="#666" style={styles.icon} />
                )}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    errorBorder: {
        borderColor: '#e74c3c',
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 14,
        color: '#e74c3c',
        marginTop: 4,
    },
});

export default CustomInput;