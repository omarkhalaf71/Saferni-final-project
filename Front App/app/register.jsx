// app/register.jsx
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";

const { width, height } = Dimensions.get("window");
const busImage = require("../assets/images/bus-removebg-preview.png");
const FORM_HEIGHT = height * 0.75;

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
        easing: Easing.out(Easing.cubic),
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // -------- Validation --------
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]+$/.test(phone) || phone.length < 10)
      newErrors.phone = "Please enter a valid phone number";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      Alert.alert("Success", "Registration successful!");
      router.replace("/login");
    } catch (err) {
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header Animation */}
      <Animated.View
        style={[styles.headerContainer, { transform: [{ translateX: headerAnim }] }]}
      >
        <Image source={busImage} style={styles.busImage} />
        <Text style={styles.title}>Create Account</Text>
      </Animated.View>

      {/* Form Animation */}
      <Animated.View
        style={[styles.formArea, { transform: [{ translateY: formAnim }] }]}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <CustomInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            iconName="person-outline"
            error={errors.fullName}
          />

          <CustomInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            iconName="call-outline"
            error={errors.phone}
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            iconName="lock-closed-outline"
            secureTextEntry
            error={errors.password}
          />

          <PrimaryButton
            title="Register"
            loading={loading}
            onPress={handleRegister}
          />

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: "#20373B",
  },

  headerContainer: {
    position: "absolute",
    top: height * 0.06,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },

  busImage: { width: 100, height: 100, resizeMode: "contain" },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },

  linkText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333333",
    marginTop: 20,
    paddingBottom: 20,
  },

  loginLink: { color: "#FFC64F", fontWeight: "bold" },
});
