import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetail() {
  const { name, openHours, description } = useLocalSearchParams<{
    name: string;
    openHours: string;
    description: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>🕒 Open Hours: {openHours}</Text>
      <View style={styles.card}>
        <Ionicons name="information-circle-outline" size={22} color="#800000" />
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#800000",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  card: {
    backgroundColor: "#fdf2f2",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#80000030",
    borderWidth: 1,
  },
  text: { fontSize: 16, color: "#333" },
});
