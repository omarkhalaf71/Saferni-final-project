// app/(tabs)/search.jsx
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = {
    yellow: "#FFC64F",
    lightBlue: "#C3E7F1",
    teal: "#519CAB",
    dark: "#20373B",
    bg: "#F4F6FA",
};

const SYRIAN_CITIES = [
    "Damascus",
    "Aleppo",
    "Homs",
    "Hama",
    "Latakia",
    "Tartus",
    "Idlib",
    "Deir ez-Zor",
    "Raqqa",
    "Al-Hasakah",
    "Qamishli",
    "Daraa",
    "As-Suwayda",
    "Palmyra",
    "Salamiyah",
    "Al-Bab",
    "Manbij",
    "Jarabulus",
    "Afrin",
    "Jableh",
];

export default function SearchScreen() {
    const router = useRouter();

    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");

    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerTarget, setPickerTarget] = useState(null);

    const openPicker = (target) => {
        setPickerTarget(target);
        setPickerVisible(true);
    };

    const handleSelectCity = (city) => {
        if (pickerTarget === "from") {
            setFromCity(city);
        } else if (pickerTarget === "to") {
            setToCity(city);
        }
        setPickerVisible(false);
    };

    const handleSubmit = () => {
        const departure_city = fromCity.trim();
        const arrival_city = toCity.trim();

        if (!departure_city || !arrival_city) {
            Alert.alert("Missing data", "Please select both From and To cities.");
            return;
        }

        router.push({
            pathname: "/offers",
            params: {
                from: departure_city,
                to: arrival_city,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Plan your trip</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>From (Departure city)</Text>
                        <TouchableOpacity
                            style={styles.selectRow}
                            activeOpacity={0.8}
                            onPress={() => openPicker("from")}
                        >
                            <Text style={styles.inputIcon}>🛫</Text>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.selectValue,
                                        !fromCity && styles.placeholderText,
                                    ]}
                                >
                                    {fromCity || "Select departure city"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>To (Arrival city)</Text>
                        <TouchableOpacity
                            style={styles.selectRow}
                            activeOpacity={0.8}
                            onPress={() => openPicker("to")}
                        >
                            <Text style={styles.inputIcon}>🚌</Text>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.selectValue,
                                        !toCity && styles.placeholderText,
                                    ]}
                                >
                                    {toCity || "Select arrival city"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.teal }]}
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Submit trip</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                visible={pickerVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPickerVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {pickerTarget === "from"
                                ? "Select departure city"
                                : "Select arrival city"}
                        </Text>

                        <ScrollView
                            style={{ maxHeight: 350 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {SYRIAN_CITIES.map((city) => (
                                <TouchableOpacity
                                    key={city}
                                    style={styles.cityRow}
                                    onPress={() => handleSelectCity(city)}
                                >
                                    <Text style={styles.cityText}>{city}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.modalCancel}
                            onPress={() => setPickerVisible(false)}
                        >
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.dark,
        marginBottom: 4,
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 12,
        marginBottom: 24,
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 18,
        paddingVertical: 18,
        shadowColor: COLORS.dark,
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        borderColor: COLORS.lightBlue,
        borderWidth: 2.5,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 6,
    },
    selectRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderColor: COLORS.lightBlue,
        borderWidth: 2.5,
    },
    inputIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    selectValue: {
        fontSize: 14,
        color: "#111827",
    },
    placeholderText: {
        color: "#9CA3AF",
    },
    button: {
        marginTop: 8,
        borderRadius: 999,
        paddingVertical: 14,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffffff",
        fontSize: 16,
        fontWeight: "700",
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(9, 27, 58, 0.35)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#ffffffff",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 10,
    },
    cityRow: {
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.dark,
    },
    cityText: {
        fontSize: 14,
        color: "#111827",
    },
    modalCancel: {
        marginTop: 10,
        alignItems: "center",
    },
    modalCancelText: {
        fontSize: 20,
        color: "#EF4444",
        fontWeight: "600",
    },
});
