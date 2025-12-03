// app/_layout.jsx
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />   
      <Stack.Screen name="(tabs)" />  
      <Stack.Screen name="trips" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
