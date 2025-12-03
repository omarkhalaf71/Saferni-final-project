// app/trips.jsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
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

const TRIPS = [
    {
        id: "1",
        from: "Damascus",
        to: "Aleppo",
        date: "Today",
        departureTime: "09:00",
        arrivalTime: "13:30",
        company: "Trwada",
        code: "SY-DAM-ALP-01",
        status: "On time",
    },
    {
        id: "2",
        from: "Damascus",
        to: "Homs",
        date: "Today",
        departureTime: "12:00",
        arrivalTime: "15:00",
        company: "SAFERNI Express",
        code: "SY-DAM-HMS-02",
        status: "Boarding",
    },
    {
        id: "3",
        from: "Aleppo",
        to: "Latakia",
        date: "Tomorrow",
        departureTime: "08:30",
        arrivalTime: "12:45",
        company: "NightLine",
        code: "SY-ALP-LTK-03",
        status: "Scheduled",
    },
];

export default function TripsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backHitbox}
                >
                    <Ionicons name="arrow-back" size={45} color={COLORS.dark} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Current trips</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.subtitle}>
                    Here are the active and upcoming trips for today and tomorrow.
                </Text>

                {TRIPS.map((trip) => (
                    <View key={trip.id} style={styles.tripCard}>
                        {/* TOP ROW: From → To */}
                        <View style={styles.tripTopRow}>
                            <View style={styles.cityCol}>
                                <Text style={styles.cityLabel}>From</Text>
                                <Text style={styles.cityValue}>{trip.from}</Text>
                            </View>

                            <View style={styles.arrowCol}>
                                <Text style={styles.arrowLine}>──────▶</Text>
                            </View>

                            <View style={[styles.cityCol, { alignItems: "flex-end" }]}>
                                <Text style={styles.cityLabel}>To</Text>
                                <Text style={styles.cityValue}>{trip.to}</Text>
                            </View>
                        </View>

                        
                        <View style={styles.timeRow}>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeLabel}>Departure</Text>
                                <Text style={styles.timeValue}>{trip.departureTime}</Text>
                            </View>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeLabel}>Arrival</Text>
                                <Text style={styles.timeValue}>{trip.arrivalTime}</Text>
                            </View>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeLabel}>Day</Text>
                                <Text style={styles.timeValue}>{trip.date}</Text>
                            </View>
                        </View>

                        
                        <View style={styles.bottomRow}>
                            <View style={styles.companyBlock}>
                                <Text style={styles.companyName}>{trip.company}</Text>
                                <Text style={styles.tripCode}>{trip.code}</Text>
                            </View>

                            <View
                                style={[
                                    styles.statusPill,
                                    trip.status === "On time" && { backgroundColor: "#22C55E20" },
                                    trip.status === "Boarding" && { backgroundColor: "#F9731620" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        trip.status === "On time" && { color: "#16A34A" },
                                        trip.status === "Boarding" && { color: "#EA580C" },
                                    ]}
                                >
                                    {trip.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 6,
        justifyContent: "space-between",
    },
    backHitbox: {
        paddingVertical: 4,
        paddingRight: 10,
        width: 40,
        alignItems: "flex-start",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.dark,
        textAlign: "center",
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingBottom: 24,
    },
    subtitle: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 10,
    },

    tripCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: COLORS.lightBlue,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    tripTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    cityCol: {
        flex: 1,
    },
    cityLabel: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    cityValue: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.dark,
    },
    arrowCol: {
        width: 60,
        alignItems: "center",
    },
    arrowLine: {
        fontSize: 12,
        color: "#9CA3AF",
    },

    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    timeBlock: {
        flex: 1,
        marginRight: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    timeLabel: {
        fontSize: 10,
        color: "#9CA3AF",
    },
    timeValue: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.dark,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    companyBlock: {
        flex: 1,
    },
    companyName: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.dark,
    },
    tripCode: {
        fontSize: 11,
        color: "#6B7280",
    },
    statusPill: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },
});
