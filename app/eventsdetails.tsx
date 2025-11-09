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
import { useFavorites } from '@/context/FavoritesContext';

const MAROON = '#9a0101ff';

const EVENTS = [
  {
    id: '1',
    title: 'WMSU Palaro 2025',
    date: 'October 20 - 25, 2025',
    time: '7:00 AM - 7:00 PM',
    location: 'WMSU Campus A & Grandstand',
    description:
      'Western Mindanao State University, the university by choice, proudly presents WMSU Palaro 2025 – the annual inter-college sports festival that ignites passion, unity, and Crimson pride across our campuses. From thrilling basketball showdowns and volleyball rallies to track and field sprints and cultural dance-offs, this week-long celebration brings together students, faculty, alumni, and the Zamboanga community for non-stop excitement. Held at the iconic Grandstand and sports facilities, Palaro fosters lifelong memories, healthy competition, and school spirit. Whether you\'re a player, cheerleader, or spectator, join us to witness the heart of WMSU come alive – where every cheer echoes our shared legacy of excellence.',
    image: require('@/assets/images/event1.jpg'),
  },
  {
    id: '2',
    title: 'Grand Alumni Homecoming 2025',
    date: 'December 03 - 07, 2025',
    time: '7:00 AM - 7:00 PM',
    location: 'WMSU Campus A & Grandstand',
    description:
      'Western Mindanao State University, the university by choice, invites Crimson alumni worldwide to the Grand Alumni Homecoming 2025 – a heartfelt reunion celebrating bonds forged in our halls. Relive cherished memories with a thanksgiving mass, vibrant kickoff parade around campus, and nostalgic \'Watchamacallit\' talent showcases where alumni dance, sing, and share stories of success. Enjoy bingo socials, basketball tournaments, and a grand testimonial dinner honoring outstanding graduates. This December tradition strengthens our global network, inspires current students, and reaffirms WMSU\'s legacy as the alma mater of leaders. Dress in Crimson pride and return home – where old friends become family again.',
    image: require('@/assets/images/event2.jpg'),
  },
  {
    id: '3',
    title: 'Founding Anniversary Celebration',
    date: 'February 14, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'WMSU Campus A & Gymnasium',
    description:
      'Western Mindanao State University, the university by choice, commemorates its 107th Founding Anniversary on February 14, 2025 – honoring a century-plus legacy that began in 1918 as Zamboanga Normal School and evolved into a premier state university in 1978. Join the festivities with a majestic ROTC parade, uplifting opening prayer, and inspiring messages from university leaders reflecting on our journey of academic excellence, community service, and cultural preservation. Witness the coronation of Mr. and Ms. WMSU – the embodiment of Crimson spirit – alongside glee club performances, dance numbers, and exhibits showcasing our 15 colleges\' achievements. This heartfelt celebration unites students, faculty, alumni, and partners to renew our commitment to innovation, inclusivity, and the socio-economic upliftment of Western Mindanao.',
    image: require('@/assets/images/event3.jpg'),
  },
];

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const event = EVENTS.find(e => e.id === id) || EVENTS[0];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.push('/(tabs)/events');
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
        <Image
          source={event.image}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.floatingCard}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{event.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(id)}>
                <Ionicons
                name={favorites[id] ? 'heart' : 'heart-outline'}
                size={28}
                color={favorites[id] ? '#FF6B6B' : '#fff'}
                />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={18} color={MAROON} />
            <View style={styles.infoText}>
              <Text style={styles.date}>{event.date}</Text>
              <Text style={styles.time}>{event.time}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={18} color={MAROON} />
            <Text style={styles.location}>{event.location}</Text>
          </View>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: MAROON,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 80,
  },
  logo: {
    width: 28,
    height: 28,
  },

  container: {
    paddingHorizontal: 16,
  },

  heroImage: {
    width: '100%',
    height: 230,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
  },

  floatingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: -50,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: MAROON,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginVertical: -20,
    marginHorizontal: -20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 16,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 21,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  date: {
    fontSize: 13.5,
    color: '#333',
    fontWeight: '600',
  },
  time: {
    fontSize: 13.5,
    color: '#555',
  },
  location: {
    fontSize: 13.5,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
});