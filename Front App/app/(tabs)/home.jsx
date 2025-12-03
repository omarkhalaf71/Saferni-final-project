// app/(tabs)/home.jsx
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const COLORS = {
    yellow: "#FFC64F",
    lightBlue: "#C3E7F1",
    teal: "#519CAB",
    dark: "#20373B",
    bg: "#F4F6FA",
};

// ---------- helpers ----------
function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatShortDate(date) {
    return date.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

function formatCountdown(ms) {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}

export default function HomeScreen() {
    const router = useRouter();

    // fake trip duration (change if you want)
    const TRIP_DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours

    // departure time fixed once
    const [startTime] = useState(() => new Date());
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const departure = startTime;
    const arrival = new Date(startTime.getTime() + TRIP_DURATION_MS);
    const remainingMs = Math.max(arrival.getTime() - now.getTime(), 0);
    const countdownLabel = formatCountdown(remainingMs);

    // ---------- MAP / LOCATION STATE ----------
    // default region over Syria
    const [region, setRegion] = useState({
        latitude: 34.8021,
        longitude: 38.9968,
        latitudeDelta: 4,
        longitudeDelta: 4,
    });
    const [hasUserLocation, setHasUserLocation] = useState(false);
    const [isRequestingLocation, setIsRequestingLocation] = useState(false);

    // ask location + center map inside app
    const askLocationAndCenter = async () => {
        try {
            setIsRequestingLocation(true);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permission denied",
                    "We can't show your current location without permission."
                );
                return;
            }

            const position = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = position.coords;

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
            setHasUserLocation(true);
        } catch (err) {
            console.log("Location error:", err);
            Alert.alert("Error", "Could not get your current location.");
        } finally {
            setIsRequestingLocation(false);
        }
    };

    // first app-level alert when user taps the map overlay
    const handleMapPress = () => {
        Alert.alert(
            "Use your location?",
            "SAFERNI wants to use your current location to show it on the map.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Allow", onPress: () => askLocationAndCenter() },
            ]
        );
    };

    // ---------- 3D MODEL (opens clean viewer, no download) ----------
    const open3DModel = () => {
        WebBrowser.openBrowserAsync(
            "https://modelviewer.dev/assets/viewer.html?model=https://modelviewer.dev/shared-assets/models/Astronaut.glb&poster=https://modelviewer.dev/shared-assets/models/Astronaut.webp&ui-theme=dark"
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* MAP + ROUTE CARD */}
                <View style={styles.mapCard}>
                    <View style={styles.mapHeaderRow}>
                        <View style={styles.routeTypePill}>
                            <Text style={styles.routeTypeIcon}>🚌</Text>
                            <View>
                                <Text style={styles.routeTypeLabel}>Route type</Text>
                                <Text style={styles.routeTypeValue}>Intercity “C”</Text>
                            </View>
                        </View>

                        <View style={styles.percentPill}>
                            <Text style={styles.percentText}>92%</Text>
                        </View>
                    </View>

                    {/* 🔥 MAP AREA */}
                    {Platform.OS === "web" ? (
                        // On web, just show your static map image
                        <Image
                            source={require("../../assets/images/map.png")}
                            style={styles.mapImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.mapWrapper}>
                            <MapView
                                style={styles.map}
                                region={region}
                                onRegionChangeComplete={setRegion}
                                showsUserLocation={hasUserLocation}
                            >
                                {hasUserLocation && (
                                    <Marker
                                        coordinate={{
                                            latitude: region.latitude,
                                            longitude: region.longitude,
                                        }}
                                        title="You are here"
                                        description="Current position"
                                    />
                                )}
                            </MapView>

                            {/* overlay asking user to enable GPS */}
                            {!hasUserLocation && (
                                <TouchableOpacity
                                    style={styles.mapOverlay}
                                    activeOpacity={0.9}
                                    onPress={handleMapPress}
                                >
                                    <Text style={styles.mapOverlayTitle}>
                                        Enable live location
                                    </Text>
                                    <Text style={styles.mapOverlayText}>
                                        Tap here to let SAFERNI use your GPS and zoom to your
                                        current position.
                                    </Text>
                                    <Text style={styles.mapOverlayButton}>
                                        {isRequestingLocation ? "Requesting..." : "Tap to allow GPS"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                {/* TIME / COUNTER CARD */}
                <View style={styles.timeCard}>
                    <View style={styles.timeTopRow}>
                        <View style={styles.timeCol}>
                            <Text style={styles.timeSmallLabel}>Departure</Text>
                            <Text style={styles.timeValue}>{formatTime(departure)}</Text>
                            <Text style={styles.timeDate}>{formatShortDate(departure)}</Text>
                        </View>

                        <View style={styles.durationPill}>
                            <Text style={styles.durationText}>{countdownLabel}</Text>
                        </View>

                        <View style={[styles.timeCol, { alignItems: "flex-end" }]}>
                            <Text style={styles.timeSmallLabel}>Arrival</Text>
                            <Text style={styles.timeValue}>{formatTime(arrival)}</Text>
                            <Text style={styles.timeDate}>{formatShortDate(arrival)}</Text>
                        </View>
                    </View>

                    <View style={styles.progressWrapper}>
                        <View style={styles.progressLine} />
                        <View style={styles.progressDot} />
                    </View>

                    <View style={styles.timeBottomRow}>
                        <View style={styles.bottomChip}>
                            <Text style={styles.bottomChipText}>
                                {formatShortDate(departure)}
                            </Text>
                        </View>
                        <View style={styles.bottomChip}>
                            <Text style={styles.bottomChipText}>1 adult</Text>
                        </View>
                        <View style={styles.bottomChip}>
                            <Text style={styles.bottomChipText}>USD</Text>
                        </View>
                    </View>
                </View>

                {/* TRANSPORT + 3D BUTTON */}
                <View style={styles.transportCard}>
                    <View style={styles.transportHeaderRow}>
                        <Text style={styles.transportTitle}>Your Transport</Text>
                        <View style={styles.smallIconCircle}>
                            <Text style={styles.smallIconText}>3D</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.modelPreview}
                        activeOpacity={0.9}
                        onPress={open3DModel}
                    >
                        <Image
                            source={require("../../assets/images/trwada.png")}
                            style={styles.modelPreviewImage}
                            resizeMode="contain"
                        />
                        <View style={styles.modelPreviewOverlay} />
                        <Text style={styles.modelPreviewText}>Tap to view 3D bus</Text>
                    </TouchableOpacity>

                    <View className="chipsRow" style={styles.chipsRow}>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Trip code</Text>
                            <Text style={styles.chipValue}>SY-DAM-ALP</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Duration</Text>
                            <Text style={styles.chipValue}>5h 30m</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Stops</Text>
                            <Text style={styles.chipValue}>2 stops</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.ctaButton}
                        activeOpacity={0.9}
                        onPress={() => router.push("/trips")}
                    >
                        <Text style={styles.ctaText}>View all trips</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const CARD_RADIUS = 28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 120, // extra for tab bar so buttons are visible
    },

    // MAP CARD
    mapCard: {
        backgroundColor: "#ffffff",
        borderRadius: CARD_RADIUS,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
        borderWidth: 1.5,
        borderColor: COLORS.lightBlue,
    },
    mapHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    routeTypePill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#F1F5F9",
    },
    routeTypeIcon: {
        fontSize: 17,
        marginRight: 6,
    },
    routeTypeLabel: {
        fontSize: 10,
        color: "#6B7280",
    },
    routeTypeValue: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.dark,
    },
    percentPill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: COLORS.dark,
    },
    percentText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "700",
    },

    
    mapWrapper: {
        width: "100%",
        height: 200,
        borderRadius: 22,
        overflow: "hidden",
        marginTop: 4,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    mapImage: {
        width: "100%",
        height: 140,
        borderRadius: 22,
        marginTop: 4,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(15,23,42,0.55)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    mapOverlayTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    mapOverlayText: {
        color: "#E5E7EB",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 10,
    },
    mapOverlayButton: {
        color: COLORS.yellow,
        fontSize: 13,
        fontWeight: "700",
    },

    
    timeCard: {
        backgroundColor: "#020617",
        borderRadius: 26,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 18,
    },
    timeTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timeCol: {
        flex: 1,
    },
    timeSmallLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        marginBottom: 2,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    timeDate: {
        fontSize: 11,
        color: "#E5E7EB",
        marginTop: 2,
    },
    durationPill: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: COLORS.yellow,
        alignSelf: "center",
        marginHorizontal: 10,
    },
    durationText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#111827",
    },
    progressWrapper: {
        marginTop: 12,
        marginBottom: 10,
        justifyContent: "center",
    },
    progressLine: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#4B5563",
    },
    progressDot: {
        position: "absolute",
        right: 18,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.yellow,
    },
    timeBottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomChip: {
        flex: 1,
        backgroundColor: "#0F172A",
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 6,
        justifyContent: "center",
    },
    bottomChipText: {
        fontSize: 11,
        color: "#E5E7EB",
        textAlign: "center",
    },

    
    transportCard: {
        backgroundColor: "#ffffff",
        borderRadius: CARD_RADIUS,
        padding: 18,
        shadowColor: COLORS.dark,
        shadowOpacity: 0.16,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
        borderWidth: 2,
        borderColor: COLORS.lightBlue,
        marginBottom: 8,
    },
    transportHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    transportTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.dark,
    },
    smallIconCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.lightBlue,
        justifyContent: "center",
        alignItems: "center",
    },
    smallIconText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.dark,
    },

    modelPreview: {
        height: 190,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: COLORS.dark,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    modelPreviewImage: {
        width: "100%",
        height: "100%",
        opacity: 0.9,
    },
    modelPreviewOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    modelPreviewText: {
        position: "absolute",
        bottom: 12,
        alignSelf: "center",
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

    chipsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
        marginBottom: 10,
    },
    chip: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 6,
        justifyContent: "center",
    },
    chipLabel: {
        fontSize: 9,
        color: "#9CA3AF",
    },
    chipValue: {
        fontSize: 12,
        color: COLORS.dark,
        fontWeight: "600",
    },
    ctaButton: {
        marginTop: 4,
        borderRadius: 999,
        backgroundColor: COLORS.teal,
        paddingVertical: 12,
        alignItems: "center",
    },
    ctaText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#ffffff",
    },
});
