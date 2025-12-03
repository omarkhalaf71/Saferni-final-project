// app/index.jsx
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    View,
} from "react-native";

const COLORS = {
    yellow: "#FFC64F",
    lightBlue: "#C3E7F1",
    teal: "#519CAB",
    dark: "#20373B",
};

export default function LoadingScreen() {
    const router = useRouter();
    const screenWidth = Dimensions.get("window").width;

    const busTranslateX = useRef(new Animated.Value(-screenWidth)).current;

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(20)).current;

    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(10)).current;

    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    // intro animation
    useEffect(() => {
        Animated.sequence([
            Animated.timing(busTranslateX, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.delay(150),
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(subtitleOpacity, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(subtitleTranslateY, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [
        busTranslateX,
        titleOpacity,
        titleTranslateY,
        subtitleOpacity,
        subtitleTranslateY,
    ]);

    // loader dots loop
    useEffect(() => {
        const createDotAnim = (anim, delay) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: -8,
                        duration: 250,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 250,
                        easing: Easing.in(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.delay(150),
                ])
            ).start();

        createDotAnim(dot1, 0);
        createDotAnim(dot2, 150);
        createDotAnim(dot3, 300);
    }, [dot1, dot2, dot3]);

    // ⬇️ IMPORTANT: go inside tabs group
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/(tabs)/home");
        }, 3600);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/images/bus.png")}
                style={[
                    styles.busImage,
                    { transform: [{ translateX: busTranslateX }] },
                ]}
                resizeMode="contain"
            />

            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    },
                ]}
            >
                SAFERNI
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.subtitle,
                    {
                        opacity: subtitleOpacity,
                        transform: [{ translateY: subtitleTranslateY }],
                    },
                ]}
            >
                Safe. Comfortable. Speed.
            </Animated.Text>

            <View style={styles.spinner}>
                <Animated.View
                    style={[
                        styles.spinnerDot,
                        { transform: [{ translateY: dot1 }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.spinnerDot,
                        { transform: [{ translateY: dot2 }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.spinnerDot,
                        { transform: [{ translateY: dot3 }] },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBlue,
        alignItems: "center",
        justifyContent: "center",
    },
    busImage: {
        width: "100%",
        height: 420,
        marginTop: 30,
        marginRight: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        letterSpacing: 3,
        color: COLORS.dark,
    },
    subtitle: {
        marginTop: 4,
        fontSize: 16,
        color: COLORS.dark,
    },
    spinner: {
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    spinnerDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.dark,
        marginHorizontal: 4,
    },
});
