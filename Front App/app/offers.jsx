// app/offers.jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    FlatList,
    Image,
    SafeAreaView,
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
    bgDark: "#050711",
    cardDark: "#171923",
};

const OFFERS = [
    {
        id: "1",
        company: "SAFERNI Express",
        busType: "Luxury Double Decker",
        rating: 4.8,
        price: "$25.00",
        departureTime: "09:00",
        arrivalTime: "13:30",
    },
    {
        id: "2",
        company: "SAFERNI Plus",
        busType: "Comfort Class",
        rating: 4.6,
        price: "$19.50",
        departureTime: "11:00",
        arrivalTime: "15:10",
    },
    {
        id: "3",
        company: "NightLine",
        busType: "Overnight Sleeper",
        rating: 4.9,
        price: "$29.00",
        departureTime: "23:00",
        arrivalTime: "07:15",
    },
];

export default function OffersScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const from = params.from || "From city";
    const to = params.to || "To city";

    const handlePressOffer = (item) => {
        router.push({
            pathname: "/trip-details",
            params: {
                from,
                to,
                company: item.company,
                busType: item.busType,
                price: item.price,
                rating: String(item.rating),
                departureTime: item.departureTime,
                arrivalTime: item.arrivalTime,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.headerLabel}>Available offers</Text>
                    <Text style={styles.routeText}>
                        {from} <Text style={styles.arrow}>→</Text> {to}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/* Hero card: Trwada */}
            <View style={styles.heroCard}>
                <View style={styles.heroTextBlock}>
                    <Text style={styles.heroTitle}>Trwada company</Text>
                    <Text style={styles.heroSubtitle}>new services</Text>
                    <TouchableOpacity style={styles.heroButton}>
                        <Text style={styles.heroButtonText}>Get special offers</Text>
                    </TouchableOpacity>
                </View>

                <Image
                    source={require("../assets/images/trwada.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                />
            </View>

            {/* Offers list */}
            <FlatList
                data={OFFERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handlePressOffer(item)}
                    >
                        <View style={styles.offerCard}>
                            <View style={styles.offerLeft}>
                                <Text style={styles.offerCompany}>{item.company}</Text>
                                <Text style={styles.offerBusType}>{item.busType}</Text>
                                <View style={styles.metaRow}>
                                    <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
                                    <Text style={styles.dot}>•</Text>
                                    <Text style={styles.price}>{item.price}</Text>
                                </View>
                                <View style={styles.timeRow}>
                                    <View>
                                        <Text style={styles.timeLabel}>Departure</Text>
                                        <Text style={styles.timeValue}>{item.departureTime}</Text>
                                    </View>
                                    <View style={{ marginLeft: 24 }}>
                                        <Text style={styles.timeLabel}>Arrival</Text>
                                        <Text style={styles.timeValue}>{item.arrivalTime}</Text>
                                    </View>
                                </View>
                            </View>

                            <Image
                                source={require("../assets/images/trwada.png")}
                                style={styles.offerImage}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 4,
    },
    headerLabel: {
        color: "#9CA3AF",
        fontSize: 12,
    },
    routeText: {
        color: "#00050aff",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 2,
    },
    arrow: {
        color: COLORS.dark,
    },
    backText: {
        color: COLORS.dark,
        fontSize: 13,
    },

    heroCard: {
        backgroundColor: "#dee5e963",
        borderRadius: 20,
        padding: 14,
        marginBottom: 16,
        overflow: "hidden",
        height: 150,
        justifyContent: "center",
        borderColor: COLORS.yellow,
        borderWidth: 2.5,
    },

    heroTextBlock: {
        flex: 1.2,
        paddingRight: 8,
    },
    heroTitle: {
        color: "#000408ff",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 4,
    },
    heroSubtitle: {
        color: "#464b53ff",
        fontSize: 11,
        marginBottom: 8,
    },
    heroButton: {
        backgroundColor: COLORS.yellow,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: "flex-start",
    },
    heroButtonText: {
        fontSize: 11,
        fontWeight: "700",
        color: COLORS.dark,
    },
    heroImage: {
        position: "absolute",
        right: -10,
        bottom: -10,
        width: 250,
        height: 190,
    },

    offerCard: {
        backgroundColor: "#dee5e963",
        borderRadius: 18,
        padding: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.lightBlue,
        borderWidth: 2.5,
    },
    offerLeft: {
        flex: 1.4,
    },
    offerCompany: {
        color: "#0d1115ff",
        fontSize: 14,
        fontWeight: "700",
    },
    offerBusType: {
        color: "#2b2d30ff",
        fontSize: 11,
        marginTop: 2,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    rating: {
        color: COLORS.yellow,
        fontSize: 11,
        fontWeight: "600",
    },
    dot: {
        color: "#6B7280",
        marginHorizontal: 4,
    },
    price: {
        color: COLORS.dark,
        fontSize: 12,
        fontWeight: "600",
    },
    timeRow: {
        flexDirection: "row",
        marginTop: 8,
    },
    timeLabel: {
        color: "#000001ff",
        fontSize: 10,
    },
    timeValue: {
        color: "#010714ff",
        fontSize: 12,
        fontWeight: "600",
    },
    offerImage: {
        flex: 1,
        height: 80,
        borderRadius: 14,
        marginLeft: 10,
    },
});
