// app/(tabs)/_layout.jsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const COLORS = {
  darkBar: "#020617", // near-black
  active: "#FFFFFF",
  inactive: "#9CA3AF",
  centerBg: "#F9FAFB",
  centerActive: "#EF4444",
  border: "#1E293B",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 14,
          height: 72,
          borderRadius: 999,
          backgroundColor: "rgba(15,23,42,0.96)", // dark glass look
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: COLORS.border,
          paddingTop: 6,
          paddingBottom: 6,
          elevation: 22,
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 10 },
        },

        tabBarIcon: ({ color, focused }) => {
          // 🔴 CENTER: Search (floating)
          if (route.name === "search") {
            return (
              <View
                style={[
                  styles.centerButton,
                  focused && styles.centerButtonActive,
                ]}
              >
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  size={22}
                  color={focused ? "#FFFFFF" : "#020617"}
                />
              </View>
            );
          }

          // 🏠 LEFT: Home
          if (route.name === "home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={focused ? 24 : 22} // small size change = simple “animation”
                color={color}
              />
            );
          }

          // ☰ RIGHT: Menu
          if (route.name === "menu") {
            return (
              <Ionicons
                name={focused ? "menu" : "menu-outline"}
                size={focused ? 24 : 22}
                color={color}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.centerBg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20, // float above bar
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 20,
  },
  centerButtonActive: {
    backgroundColor: COLORS.centerActive,
  },
});
