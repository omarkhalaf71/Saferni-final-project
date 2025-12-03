import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");
const FORM_HEIGHT = height * 0.65;
const busImage = require("../assets/images/bus-removebg-preview.png");

const COLORS = {
    yellow: "#FFC64F",
    teal: "#519CAB",
    dark: "#20373B",
    bg: "#FFFFFF",
};

export default function LoginScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    /** === Animations === **/
    const headerAnim = useRef(new Animated.Value(-width)).current;
    const formAnim = useRef(new Animated.Value(FORM_HEIGHT)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 0,
                duration: 1200,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            Animated.timing(formAnim, {
                toValue: 0,
                duration: 1100,
                delay: 150,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        router.replace("/(tabs)/home");
    };

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <Animated.View
                style={[styles.headerContainer, { transform: [{ translateX: headerAnim }] }]}
            >
                <Image source={busImage} style={styles.busImage} />
                <Text style={styles.title}>Welcome Back</Text>
            </Animated.View>

            {/* Form Area */}
            <Animated.View
                style={[styles.formArea, { transform: [{ translateY: formAnim }] }]}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Summary (if coming from booking) */}
                    {params.from && (
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryText}>
                                {params.from} → {params.to}
                            </Text>
                            <Text style={styles.summaryText}>
                                {params.date} • {params.time}
                            </Text>
                            <Text style={styles.summaryText}>
                                Seats: {params.seats || "-"}
                            </Text>
                            <Text style={styles.summaryText}>Price: {params.price}</Text>
                        </View>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/register")}>
                        <Text style={styles.linkText}>
                            Don't have an account?{" "}
                            <Text style={styles.linkStrong}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.dark,
    },
    headerContainer: {
        position: "absolute",
        top: height * 0.12,
        left: 0,
        width: "100%",
        paddingHorizontal: 20,
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    busImage: {
        width: 130,
        height: 130,
        resizeMode: "contain",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#FFF",
        marginLeft: 10,
    },
    formArea: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: FORM_HEIGHT,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: "#000",
        elevation: 8,
        paddingBottom: 20,
    },
    scrollContainer: {
        paddingTop: 40,
        paddingHorizontal: 30,
    },
    summaryBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 12,
        color: "#4B5563",
    },
    input: {
        backgroundColor: "#F7F8F9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E8ECF4",
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 50,
    },
    button: {
        backgroundColor: COLORS.teal,
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: "#FFF",
        fontWeight: "700",
    },
    linkText: {
        textAlign: "center",
        marginTop: 20,
        color: "#4B5563",
        fontSize: 14,
    },
    linkStrong: {
        color: COLORS.yellow,
        fontWeight: "700",
    },
});
