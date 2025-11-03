import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAROON = '#9a0101ff';

type Place = {
  id: string;
  title: string;
  subtitle?: string;
  hours?: string;
  location?: string;
  tags?: string[];
  iconName?: string;
};

const SAMPLE: Place[] = [
  {
    id: 'library',
    title: 'Library',
    subtitle: 'Main university library with extensive collection of books and digital resources.',
    hours: '8:00 AM - 10:00 PM',
    location: 'Building A, Main Campus',
    tags: ['Study Area', 'Computer Lab', 'Printing Service'],
    iconName: 'book-open-page-variant',
  },
  {
    id: 'canteen',
    title: 'Canteen',
    subtitle: 'Main dining facility with variety of food options for students and staff.',
    hours: '7:00 AM - 8:00 PM',
    location: 'Building B, Ground Floor',
    tags: ['Breakfast', 'Lunch', 'Dinner'],
    iconName: 'silverware-fork-knife',
  },
  {
    id: 'admin',
    title: 'Admin Office',
    subtitle: 'Administrative center for student services and official matters.',
    hours: '9:00 AM - 5:00 PM',
    location: 'Building C, 3rd Floor',
    tags: ['Registration', 'Document Processing', 'Financial Aid'],
    iconName: 'office-building',
  },
];

export default function PlacesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/wmsu-logo.jpg')}
            style={{ width: 26, height: 26, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Campus Places</Text>
        </View>
        <MaterialCommunityIcons name="map" size={22} color="white" />
      </View>

      {/* BODY */}
      <ScrollView contentContainerStyle={styles.container}>
        {SAMPLE.map((p) => (
          <View key={p.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons name={p.iconName as any} size={22} color="white" />
              </View>
              <TouchableOpacity style={styles.heart} onPress={() => toggleFav(p.id)}>
                <Ionicons
                  name={favorites[p.id] ? 'heart' : 'heart-outline'}
                  size={20}
                  color={favorites[p.id] ? '#FF6B6B' : 'white'}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push({ pathname: '/placedetail', params: { id: p.id } })}
            >
              <Text style={styles.title}>{p.title}</Text>
              <Text style={styles.subtitle}>{p.subtitle}</Text>
            </TouchableOpacity>

            <View style={styles.cardFooter}>
              <View style={styles.row}>
                <Ionicons name="time-outline" size={16} color="#444" />
                <Text style={styles.small}>{p.hours}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={16} color="#444" />
                <Text style={styles.small}>{p.location}</Text>
              </View>
            </View>

            <View style={styles.tags}>
              {p.tags?.map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 32 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
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
  heart: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800', marginTop: 12, marginHorizontal: 16, color: '#111' },
  subtitle: { marginHorizontal: 16, color: '#666', marginTop: 8 },
  cardFooter: { marginTop: 12, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  small: { marginLeft: 8, color: '#444' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, marginTop: 12 },
  tag: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: { color: '#8A1C1C', fontWeight: '600', fontSize: 11 },
});
