// app/trip-details.jsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
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

// build next 7 days
const buildNextDays = () => {
    const days = [];
    const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);

        const dayName = DAY_NAMES[d.getDay()];
        const date = d.getDate();
        const month = d.getMonth() + 1;

        days.push({
            id: i,
            label: `${dayName} ${date}/${month}`,
            value: d.toISOString(),
        });
    }
    return days;
};

const TIME_SLOTS = ["08:00", "09:30", "11:00", "13:30", "16:00", "19:30", "22:00"];

export default function TripDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const from = params.from || "From city";
    const to = params.to || "To city";
    const company = params.company || "SAFERNI";
    const busType = params.busType || "Luxury Bus";
    const price = params.price || "$--";
    const departureTime = params.departureTime || "09:00";
    const rating = params.rating || "4.5";

    const days = buildNextDays();

    const [selectedDay, setSelectedDay] = useState(days[0].id);
    const [selectedTime, setSelectedTime] = useState(departureTime);

    const handleChooseSeats = () => {
        const dayLabel = days.find((d) => d.id === selectedDay).label;

        router.push({
            pathname: "/seats",
            params: {
                from,
                to,
                company,
                busType,
                price,
                rating,
                date: dayLabel,
                time: selectedTime,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backHitbox}>
                    <Ionicons name="arrow-back" size={45} color={COLORS.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trip details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                {/* top card with bus + info */}
                <View style={styles.busCard}>
                    <View style={styles.busTextBlock}>
                        <Text style={styles.routeText}>
                            {from} <Text style={styles.arrow}>→</Text> {to}
                        </Text>
                        <Text style={styles.companyText}>{company}</Text>
                        <Text style={styles.busTypeText}>{busType}</Text>

                        <View style={styles.busMetaRow}>
                            <Text style={styles.ratingText}>★ {Number(rating).toFixed(1)}</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.priceText}>{price}</Text>
                        </View>
                    </View>

                    <Image
                        source={require("../assets/images/trwada.png")}
                        style={styles.busImage}
                        resizeMode="contain"
                    />
                </View>

                {/* date selection */}
                <Text style={styles.sectionLabel}>Select date</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.daysRow}
                >
                    {days.map((day) => {
                        const active = day.id === selectedDay;
                        return (
                            <TouchableOpacity
                                key={day.id}
                                style={[styles.dayChip, active && styles.dayChipActive]}
                                onPress={() => setSelectedDay(day.id)}
                            >
                                <Text
                                    style={[styles.dayChipText, active && styles.dayChipTextActive]}
                                >
                                    {day.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* time selection */}
                <Text style={styles.sectionLabel}>Select departure time</Text>
                <View style={styles.timesGrid}>
                    {TIME_SLOTS.map((t) => {
                        const active = t === selectedTime;
                        return (
                            <TouchableOpacity
                                key={t}
                                style={[styles.timeChip, active && styles.timeChipActive]}
                                onPress={() => setSelectedTime(t)}
                            >
                                <Text
                                    style={[styles.timeChipText, active && styles.timeChipTextActive]}
                                >
                                    {t}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Summary</Text>
                    <Text style={styles.summaryLine}>
                        Route:{" "}
                        <Text style={styles.summaryValue}>
                            {from} → {to}
                        </Text>
                    </Text>
                    <Text style={styles.summaryLine}>
                        Date:{" "}
                        <Text style={styles.summaryValue}>
                            {days.find((d) => d.id === selectedDay).label}
                        </Text>
                    </Text>
                    <Text style={styles.summaryLine}>
                        Time: <Text style={styles.summaryValue}>{selectedTime}</Text>
                    </Text>
                    <Text style={styles.summaryLine}>
                        Price: <Text style={styles.summaryValue}>{price}</Text>
                    </Text>
                </View>

                {/* choose seats button */}
                <TouchableOpacity
                    style={styles.ctaButton}
                    activeOpacity={0.9}
                    onPress={handleChooseSeats}
                >
                    <Text style={styles.ctaText}>Choose seats</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    backHitbox: {
        width: 40,
        paddingVertical: 4,
        paddingRight: 8,
        alignItems: "flex-start",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.dark,
    },

    busCard: {
        backgroundColor: "#dee5e963",
        borderRadius: 20,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.lightBlue,
        borderWidth: 2,
        marginBottom: 16,
        overflow: "hidden",
    },
    busTextBlock: {
        flex: 1.4,
    },
    routeText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#020617",
        marginBottom: 4,
    },
    arrow: {
        color: COLORS.teal,
    },
    companyText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
    },
    busTypeText: {
        fontSize: 11,
        color: "#6B7280",
        marginTop: 2,
    },
    busMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    ratingText: {
        fontSize: 11,
        color: COLORS.yellow,
        fontWeight: "600",
    },
    dot: {
        color: "#6B7280",
        marginHorizontal: 4,
    },
    priceText: {
        fontSize: 12,
        color: COLORS.dark,
        fontWeight: "600",
    },
    busImage: {
        flex: 1,
        height: 90,
    },

    sectionLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
        marginTop: 4,
    },

    daysRow: {
        paddingVertical: 4,
        paddingRight: 8,
    },
    dayChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        backgroundColor: "#E5E7EB",
        marginRight: 8,
    },
    dayChipActive: {
        backgroundColor: COLORS.teal,
        borderColor: COLORS.teal,
    },
    dayChipText: {
        fontSize: 12,
        color: "#111827",
    },
    dayChipTextActive: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    timesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
        marginBottom: 12,
    },
    timeChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        backgroundColor: "#E5E7EB",
        margin: 4,
    },
    timeChipActive: {
        backgroundColor: COLORS.dark,
        borderColor: COLORS.dark,
    },
    timeChipText: {
        fontSize: 13,
        color: "#111827",
    },
    timeChipTextActive: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    summaryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },
    summaryLine: {
        fontSize: 12,
        color: "#4B5563",
        marginTop: 2,
    },
    summaryValue: {
        fontWeight: "600",
        color: "#111827",
    },

    ctaButton: {
        backgroundColor: COLORS.teal,
        borderRadius: 999,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 8,
    },
    ctaText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
