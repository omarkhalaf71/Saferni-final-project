// app/seats.jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = {
    yellow: "#FFC64F",
    lightBlue: "#519CAB",
    teal: "#519CAB",
    dark: "#020617",
    bg: "#020617",
    panel: "#0B1120",
    seatAvailable: "#020617",
    seatBooked: "#111827",
    seatSelected: "#FACC15",
};

// bus layout: 10 rows, 4 seats (A,B aisle C,D)
const ROWS = 10;
const COLS = ["A", "B", "C", "D"];

// demo booked seats
const BOOKED = ["1A", "1B", "3C", "4D", "6B", "8C"];

const Seat = ({ code, booked, selected, onPress }) => {
    const baseStyle = [styles.seatOuter];
    const barStyle = [styles.seatBar];
    let textStyle = [styles.seatLabel];

    if (booked) {
        baseStyle.push(styles.seatBooked);
        barStyle.push(styles.barBooked);
        textStyle.push(styles.labelBooked);
    } else if (selected) {
        baseStyle.push(styles.seatSelected);
        barStyle.push(styles.barSelected);
        textStyle.push(styles.labelSelected);
    } else {
        baseStyle.push(styles.seatAvailable);
        barStyle.push(styles.barAvailable);
    }

    return (
        <TouchableOpacity
            activeOpacity={booked ? 1 : 0.8}
            disabled={booked}
            onPress={onPress}
            style={baseStyle}
        >
            <Text style={textStyle}>{code}</Text>
            <View style={barStyle} />
        </TouchableOpacity>
    );
};

const LegendItem = ({ color, label }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={styles.legendText}>{label}</Text>
    </View>
);

export default function SeatsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const from = params.from || "From city";
    const to = params.to || "To city";
    const company = params.company || "SAFERNI";
    const busType = params.busType || "Luxury Bus";
    const price = params.price || "$--";
    const date = params.date || "Date";
    const time = params.time || "Time";

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (code) => {
        if (BOOKED.includes(code)) return;

        setSelectedSeats((prev) =>
            prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
        );
    };

    // 🔥 UPDATED: go to /login instead of showing Alert
    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            Alert.alert("No seats selected", "Please choose at least one seat.");
            return;
        }

        router.push({
            pathname: "/login",
            params: {
                from,
                to,
                company,
                busType,
                price,
                date,
                time,
                seats: selectedSeats.join(", "),
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Earth Express</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* SMALL TRIP INFO */}
            <View style={styles.infoBlock}>
                <Text style={styles.infoCompany}>{company}</Text>
                <Text style={styles.infoSub}>
                    {busType} · {from} → {to}
                </Text>
                <Text style={styles.infoSub}>
                    {date} • {time} • {price}
                </Text>
            </View>

            {/* BUS PANEL */}
            <View style={styles.panel}>
                {/* TABS */}
                <View style={styles.tabRow}>
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTextActive}>AVAILABLE</Text>
                        <View
                            style={[
                                styles.tabUnderline,
                                { backgroundColor: COLORS.lightBlue },
                            ]}
                        />
                    </View>
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTextMuted}>RESERVED</Text>
                        <View
                            style={[
                                styles.tabUnderline,
                                { backgroundColor: "#64748B" },
                            ]}
                        />
                    </View>
                    <View style={styles.tabItem}>
                        <Text style={styles.tabTextMuted}>SELECTED</Text>
                        <View
                            style={[
                                styles.tabUnderline,
                                { backgroundColor: COLORS.yellow },
                            ]}
                        />
                    </View>
                </View>

                {/* DRIVER ICON */}
                <View style={styles.steeringWrapper}>
                    <View style={styles.steeringCircle}>
                        <Text style={styles.steeringIcon}>🛞</Text>
                    </View>
                </View>

                {/* SEATS AREA */}
                <View style={styles.seatArea}>
                    {/* left section A,B */}
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.seatsScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        {Array.from({ length: ROWS }).map((_, rowIndex) => {
                            const rowNumber = rowIndex + 1;

                            return (
                                <View key={rowNumber} style={styles.row}>
                                    {/* left side (A,B) */}
                                    <View style={styles.side}>
                                        {["A", "B"].map((col) => {
                                            const code = `${rowNumber}${col}`;
                                            const booked = BOOKED.includes(code);
                                            const selected = selectedSeats.includes(code);
                                            return (
                                                <Seat
                                                    key={code}
                                                    code={code}
                                                    booked={booked}
                                                    selected={selected}
                                                    onPress={() => toggleSeat(code)}
                                                />
                                            );
                                        })}
                                    </View>

                                    {/* aisle */}
                                    <View style={styles.aisle}>
                                        <View style={styles.aisleInner}>
                                            <Text style={styles.aisleText}>WALKING</Text>
                                        </View>
                                    </View>

                                    {/* right side (C,D) */}
                                    <View style={styles.side}>
                                        {["C", "D"].map((col) => {
                                            const code = `${rowNumber}${col}`;
                                            const booked = BOOKED.includes(code);
                                            const selected = selectedSeats.includes(code);
                                            return (
                                                <Seat
                                                    key={code}
                                                    code={code}
                                                    booked={booked}
                                                    selected={selected}
                                                    onPress={() => toggleSeat(code)}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>

            {/* LEGEND */}
            <View style={styles.legendRow}>
                <LegendItem color={COLORS.seatAvailable} label="Available" />
                <LegendItem color={COLORS.seatBooked} label="Reserved" />
                <LegendItem color={COLORS.seatSelected} label="Selected" />
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.footerLabel}>Selected seats</Text>
                    <Text style={styles.footerValue}>
                        {selectedSeats.length ? selectedSeats.join(", ") : "None"}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !selectedSeats.length && { opacity: 0.4 },
                    ]}
                    activeOpacity={0.9}
                    onPress={handleConfirm}
                    disabled={!selectedSeats.length}
                >
                    <Text style={styles.confirmText}>Confirm seats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const SEAT_W = 34;
const SEAT_H = 36;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 16,
        paddingTop: 8,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    backText: {
        color: "#E5E7EB",
        fontSize: 14,
    },
    headerTitle: {
        color: "#000103ff",
        fontSize: 18,
        fontWeight: "700",
    },

    infoBlock: {
        marginBottom: 12,
    },
    infoCompany: {
        color: "#000509ff",
        fontSize: 15,
        fontWeight: "700",
    },
    infoSub: {
        color: "#00050ee6",
        fontSize: 12,
        marginTop: 2,
    },

    panel: {
        backgroundColor: "#b7c1cc32",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        overflow: "hidden",
        borderColor: COLORS.lightBlue,
        borderWidth: 2.5,
    },

    tabRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
    },
    tabTextActive: {
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "700",
    },
    tabTextMuted: {
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "600",
    },
    tabUnderline: {
        marginTop: 4,
        height: 2,
        width: 40,
        borderRadius: 999,
    },

    steeringWrapper: {
        alignItems: "flex-end",
        marginBottom: 8,
    },
    steeringCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#1F2937",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
    },
    steeringIcon: {
        fontSize: 16,
        color: "#E5E7EB",
    },

    seatArea: {
        flexDirection: "row",
        marginTop: 4,
    },
    seatsScroll: {
        paddingBottom: 4,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    side: {
        flexDirection: "row",
        gap: 6,
    },
    aisle: {
        width: 40,
        paddingHorizontal: 4,
    },
    aisleInner: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#1F2937",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
    },
    aisleText: {
        fontSize: 8,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "#4B5563",
    },

    seatOuter: {
        width: SEAT_W,
        height: SEAT_H,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 4,
        paddingBottom: 3,
        marginHorizontal: 1,
    },
    seatAvailable: {
        backgroundColor: COLORS.seatAvailable,
        borderColor: "#1F2937",
    },
    seatBooked: {
        backgroundColor: COLORS.seatBooked,
        borderColor: "#020617",
    },
    seatSelected: {
        backgroundColor: COLORS.seatSelected,
        borderColor: COLORS.seatSelected,
    },
    seatLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "#E5E7EB",
    },
    labelBooked: {
        color: "#9CA3AF",
    },
    labelSelected: {
        color: "#1F2937",
    },
    seatBar: {
        width: "70%",
        height: 3,
        borderRadius: 999,
        marginBottom: 2,
    },
    barAvailable: {
        backgroundColor: COLORS.lightBlue,
    },
    barBooked: {
        backgroundColor: "#6B7280",
    },
    barSelected: {
        backgroundColor: "#FBBF24",
    },

    legendRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    legendDot: {
        width: 14,
        height: 14,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        fontSize: 11,
        color: "#9CA3AF",
    },

    footer: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 8,
    },
    footerLabel: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    footerValue: {
        fontSize: 13,
        color: "#F9FAFB",
        fontWeight: "600",
        marginTop: 2,
        maxWidth: 180,
    },
    confirmButton: {
        backgroundColor: COLORS.yellow,
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginLeft: 12,
    },
    confirmText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
});
