import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MAROON = '#9a0101ff';

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  tag?: string;
};

const EVENTS: EventItem[] = [
  {
    id: 'orientation',
    title: 'Orientation Week',
    description: 'Welcome event for new students with campus tours, club booths, and networking activities.',
    date: 'September 07 - 17, 2025',
    location: 'Main Campus Grounds',
    tag: 'Social',
  },
  {
    id: 'sportsday',
    title: 'Palaro Wekk',
    description: 'Annual campus sports competition featuring various sports and activities for all students.',
    date: 'October 20-24, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'WMSU Campus and Grandstand',
    tag: 'Sports',
  },
  {
    id: 'science',
    title: 'Science Exhibition',
    description: 'Student research projects and innovative displays showcasing the latest scientific work.',
    date: 'October 5, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Science Building',
    tag: 'Academic',
  },
  {
    id: 'annualfest',
    title: 'Alumni',
    description: 'A celebration with cultural performances, music, food, and entertainment.',
    date: 'December 03-07, 2025',
    location: 'WMSU Campus',
    tag: 'Social',
  },
  {
    id: 'workshop',
    title: 'Webinar for CCS students',
    description: 'Industry expert workshop on modern digital marketing strategies and tools.',
    date: 'September 28, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Tech Lab, Building D',
    tag: 'Workshop',
  },
];

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/wmsu-logo.jpg')}
            style={{ width: 26, height: 26, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Campus Events</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {EVENTS.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons name="calendar-star" size={20} color="white" />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{e.tag}</Text>
              </View>
            </View>

            <View style={{ padding: 12 }}>
              <Text style={styles.title}>{e.title}</Text>
              <Text style={styles.subtitle}>{e.description}</Text>

              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={16} color="#444" />
                <Text style={styles.metaText}>{e.date}</Text>
              </View>

              {e.time ? (
                <View style={styles.metaRow}>
                  <Ionicons name="time-outline" size={16} color="#444" />
                  <Text style={styles.metaText}>{e.time}</Text>
                </View>
              ) : null}

              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={16} color="#444" />
                <Text style={styles.metaText}>{e.location}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 36 }} />
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
  card: {
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: MAROON,
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8A1C1C',
    marginRight: 6,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  badgeText: {
    color: '#8A1C1C',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: { fontSize: 18, fontWeight: '800', color: '#111' },
  subtitle: { color: '#666', marginTop: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  metaText: { marginLeft: 8, color: '#444' },
});
