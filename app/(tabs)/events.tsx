import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function EventsScreen() {
  const [events, setEvents] = useState([
    { id: "1", title: "Freshmen Orientation", date: "November 5, 2025" },
    { id: "2", title: "Intramurals Opening", date: "November 10, 2025" },
    { id: "3", title: "Research Forum", date: "November 18, 2025" },
    { id: "4", title: "Campus Clean-Up Drive", date: "November 22, 2025" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800000",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fdf2f2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#80000030",
    shadowColor: "#800000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: { fontSize: 18, color: "#800000", fontWeight: "600" },
  eventDate: { color: "#555" },
});
