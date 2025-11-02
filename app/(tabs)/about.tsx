import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Campus Guide</Text>
      <Text style={styles.text}>Developed by Group 3</Text>
      <Text style={styles.text}>Helping students explore the campus.</Text>

      <Text style={[styles.title, { marginTop: 20 }]}>Contact</Text>
      <Text style={styles.text}>📞 Campus Hotline: (062) 123-4567</Text>
      <Text style={styles.text}>📧 Email: campusguide@wmsu.edu.ph</Text>
      <Text style={styles.text}>🚨 Emergency: 0917-000-0000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#800000", marginBottom: 8 },
  text: { fontSize: 16, color: "#333", marginBottom: 5 },
});
