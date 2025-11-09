'use client';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/context/FavoritesContext';

const MAROON = '#9a0101ff';

export default function PlaceDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { favorites, toggleFavorite } = useFavorites();

  const place = PLACES[id] ?? PLACES['1'];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.push('/(tabs)/places');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WMSU Campus Guide</Text>
        <Image
          source={require('@/assets/images/wmsu-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroContainer}>
          <Image source={place.image} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.titleOverlay}>
                <Text style={styles.overlayTitle}>{place.title}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(id)}>
                  <Ionicons
                    name={favorites[id] ? 'heart' : 'heart-outline'}
                    size={28}
                    color={favorites[id] ? '#FF6B6B' : '#fff'}
                  />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.floatingCard}>
          <Text style={styles.description}>{place.description}</Text>
          <View style={styles.hoursBox}>
            <Text style={styles.hoursLabel}>Operating Hours</Text>
            <View style={styles.hoursRow}>
              <Text style={styles.daysText}>{place.days}</Text>
              <Ionicons name="time" size={16} color={MAROON} style={styles.timeIcon}/>
              <Text style={styles.timeText}>{place.hours}</Text>
            </View>
            <View style={styles.locationBottom}>
              <Ionicons name="location" size={16} color={MAROON} />
              <Text style={styles.locationText}>{place.location}</Text>
            </View>
          </View>
          <View style={styles.servicesBox}>
            <Text style={styles.servicesLabel}>Services and Facilities</Text>
            {place.services.map((service) => (
              <View key={service} style={styles.serviceRow}>
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: MAROON,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 80 },
  logo: { width: 28, height: 28 },
  container: { paddingHorizontal: 16 },
  heroContainer: { position: 'relative', marginTop: 20, marginBottom: 20 },
  heroImage: { width: '100%', height: 350, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: MAROON,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  overlayTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  floatingCard: {
    backgroundColor: '#edf7f9ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  description: { fontSize: 15, fontWeight: '500', color: '#383838ff', lineHeight: 21, marginBottom: 12 },
  hoursBox: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 12, marginBottom: 16 },
  hoursLabel: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 6 },
  hoursRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  daysText: { fontSize: 13.5, color: '#555', marginLeft: 4 },
  timeIcon: { marginLeft: 35 },
  timeText: { fontSize: 13.5, color: '#333' },
  locationBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 13.5, color: '#333', marginLeft: 8 },
  servicesBox: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#eee' },
  servicesLabel: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 10 },
  serviceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkmark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: MAROON,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  serviceText: { fontSize: 13.5, color: '#333' },
});