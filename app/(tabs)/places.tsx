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
import { useRouter } from 'expo-router';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/context/FavoritesContext';

const MAROON = '#9a0101ff';

export default function PlacesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/wmsu-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>WMSU Campus Guide</Text>
      </View>
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Go all the way! Read more about the popular campus places.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {Object.values(PLACES).map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: '/placedetails',
                params: { id: place.id },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{place.title}</Text>
              <TouchableOpacity onPress={(e) => { e.stopPropagation(); toggleFavorite(place.id); }}>
                <Ionicons
                  name={favorites[place.id] ? 'heart' : 'heart-outline'}
                  size={24}
                  color={favorites[place.id] ? '#FF6B6B' : '#fff'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <Image source={place.image} style={styles.cardImage} resizeMode="cover" />

              <View style={styles.infoWrapper}>
                <Text style={styles.cardDescription}>{place.description}</Text>
                <View style={styles.infoColumn}>
                  <View style={styles.infoRow}>
                    <Ionicons name="time" size={16} color={MAROON} />
                    <Text style={styles.cardInfoText}>{place.hours}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="location" size={16} color={MAROON} />
                    <Text style={styles.cardInfoText}>{place.location}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.tagsRow}>
              {place.services.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: { width: 32, height: 32, marginRight: 10 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  intro: { paddingHorizontal: 16, paddingVertical: 16 },
  introText: {
    fontSize: 20,
    color: '#1d1c1cff',
    fontWeight: 'bold',
    lineHeight: 22,
    textAlign: 'center',
  },
  container: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#edf7f9ff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    backgroundColor: MAROON,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  cardTitle: { 
    color: '#fff', fontSize: 18, fontWeight: '700' 
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,    
    paddingTop: 12,
  },
  cardImage: {
    width: 120,
    height: 150,
    borderRadius: 12,
    marginRight: 12,         
  },
  infoWrapper: {
    flex: 1,                   
    justifyContent: 'flex-start',
  },
  cardDescription: {
    fontSize: 13.5,
    color: '#444',
    lineHeight: 19,
    marginBottom: 8,
  },
  infoColumn: {
    marginBottom: 0,           
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardInfoText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 8,
    marginLeft: 5,    
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0e9e9ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: MAROON,
    fontWeight: '600',
  },
});