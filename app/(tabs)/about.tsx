import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAROON = '#9a0101ff';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header with logo + title (only change) */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/wmsu-logo.jpg')}
            style={{ width: 26, height: 26, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>About</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Ionicons name="school" size={44} color="white" />
          <Text style={styles.heroTitle}>WMSU Campus Guide</Text>
          <Text style={styles.heroSubtitle}>Your companion for navigating campus life</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About This App</Text>
          <Text style={styles.cardText}>
            The WMSU Campus Guide is designed to help students navigate campus, discover important
            locations, stay updated on events, and access critical support information.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Development Team</Text>
          <Text style={styles.devName}>Ashley Villanueva -UI/UX Designer</Text>
          <Text style={styles.devEmail}>hz2023000368@emsu.edu.ph</Text>

          <Text style={[styles.devName, { marginTop: 12 }]}>Collen Cuento - Lead Developer</Text>
          <Text style={styles.devEmail}>hz202300369@wmsu.edu.ph</Text>

          <Text style={[styles.devName, { marginTop: 12 }]}>Ashley Faye Vega - Project Manager</Text>
          <Text style={styles.devEmail}>hz202300370@wmsu.edu.ph</Text>

          <Text style={[styles.devName, { marginTop: 12 }]}>Josie Banalo - Business Analyst</Text>
          <Text style={styles.devEmail}>hz202300371@wmsu.edu.ph</Text>

          <Text style={[styles.devName, { marginTop: 12 }]}>John Carlo Pardillo - QA</Text>
          <Text style={styles.devEmail}>hz202300372@wmsu.edu.ph</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Main Office Contact</Text>
          <Text style={styles.cardText}>
            Western Mindanao State University{'\n'}
            Normal Rd, Baliwasan, Zamboanga City{'\n'}
            Philippines 7000
          </Text>
          <Text style={[styles.cardText, { marginTop: 8 }]}>+606 (062) 301-127</Text>
          <Text style={[styles.cardText, { marginTop: 4 }]}>info@wmsu.edu.ph</Text>
        </View>

        <View style={[styles.card, styles.emergency]}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <View style={styles.emRow}>
            <Text style={styles.emLabel}>Campus Security</Text>
            <Text style={styles.emNumber}>+606 (062) 301-127 (ext. 911)</Text>
          </View>
          <View style={styles.emRow}>
            <Text style={styles.emLabel}>University Medical Center</Text>
            <Text style={styles.emNumber}>+606 (062) 301-127 (ext. 220)</Text>
          </View>
          <View style={styles.emRow}>
            <Text style={styles.emLabel}>Student Counseling Services</Text>
            <Text style={styles.emNumber}>+606 (062) 301-127 (ext. 305)</Text>
          </View>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: MAROON,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '700' },
  container: { padding: 16 },
  hero: {
    backgroundColor: MAROON,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 16,
  },
  heroTitle: { color: 'white', fontSize: 22, fontWeight: '800', marginTop: 12 },
  heroSubtitle: { color: 'white', marginTop: 6 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontWeight: '700', marginBottom: 8, color: '#222' },
  cardText: { color: '#555' },
  devName: { fontWeight: '700', color: '#222' },
  devEmail: { color: '#666', marginTop: 4 },
  emergency: {
    borderLeftWidth: 4,
    borderLeftColor: '#D9534F',
  },
  emRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  emLabel: { color: '#333' },
  emNumber: { color: '#D9534F', fontWeight: '700' },
});
