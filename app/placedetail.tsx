import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const MAROON = "#9a0101ff";

type Place = {
  id: string;
  title: string;
  about: string;
  location: string;
  weekdayHours: string;
  weekendHours?: string;
  services: string[];
};

const PLACES: Place[] = [
  {
    id: "library",
    title: "Library",
    about:
      "Main university library with extensive collection of books and digital resources.",
    location: "Building A, Main Campus",
    weekdayHours: "8:00 AM - 10:00 PM",
    services: ["Study Area", "Computer Lab", "Printing Service"],
  },
  {
    id: "canteen",
    title: "Canteen",
    about:
      "Campus canteen offering affordable and delicious meals for students and staff.",
    location: "Building B, Ground Floor",
    weekdayHours: "7:00 AM - 8:00 PM",
    weekendHours: "9:00 AM - 6:00 PM",
    services: ["Dine-in", "Takeaway", "Vegetarian Options"],
  },
  {
    id: "admin",
    title: "Admin Office",
    about: "Administrative center for student services and official matters.",
    location: "Building C, 3rd Floor",
    weekdayHours: "9:00 AM - 5:00 PM",
    services: ["Registration", "Document Processing", "Financial Aid"],
  },
];

export default function PlaceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);

  const place = PLACES.find((p) => p.id === id) ?? PLACES[0];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Place Details</Text>
        <TouchableOpacity onPress={() => setFavorite((v) => !v)}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name="office-building"
              size={32}
              color="white"
            />
          </View>
          <Text style={styles.placeTitle}>{place.title}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.cardText}>{place.about}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={18}
              color="#444"
            />
            <Text style={styles.locationText}>{place.location}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Operating Hours</Text>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursLabel}>Weekdays</Text>
            <Text style={styles.hoursValue}>{place.weekdayHours}</Text>
          </View>
          {place.weekendHours && (
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Weekends</Text>
              <Text style={styles.hoursValue}>{place.weekendHours}</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Services & Facilities</Text>
          {place.services.map((service) => (
            <View key={service} style={styles.serviceRow}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={14} color="white" />
              </View>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: MAROON,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  container: { padding: 16 },
  hero: {
    backgroundColor: MAROON,
    borderRadius: 8,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  placeTitle: { color: "white", fontSize: 26, fontWeight: "800" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#222" },
  cardText: { color: "#555", lineHeight: 20 },
  row: { flexDirection: "row", alignItems: "center" },
  locationText: { marginLeft: 8, color: "#444" },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  hoursLabel: { color: "#444" },
  hoursValue: { color: "#111", fontWeight: "600" },
  serviceRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#25A85A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  serviceText: { color: "#333" },
});
