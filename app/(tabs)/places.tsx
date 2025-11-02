import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const DATA = [
  { id: 1, name: "Library", description: "Books and study spaces", openHours: "8AM–5PM" },
  { id: 2, name: "Canteen", description: "Food and snacks", openHours: "7AM–7PM" },
  { id: 3, name: "Admin Office", description: "Documents and inquiries", openHours: "8AM–4PM" },
];

export default function Places() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const router = useRouter();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Campus Buildings</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/placedetail",
                params: {
                  id: String(item.id),
                  name: item.name,
                  description: item.description,
                  openHours: item.openHours,
                },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.placeName}>{item.name}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Ionicons
                  name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color="#800000"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.hours}>🕒 Open: {item.openHours}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800000",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#800000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800000",
  },
  desc: {
    color: "#333",
    marginBottom: 4,
  },
  hours: {
    color: "#666",
    fontStyle: "italic",
  },
});
