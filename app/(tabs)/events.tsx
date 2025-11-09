'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from '@/context/FavoritesContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42; 
const MAROON = '#9a0101ff';
const SLIDE_DURATION = 4000;

const HERO_IMAGES = [
  require('@/assets/images/events-img1.jpg'),
  require('@/assets/images/events-img2.jpg'),
  require('@/assets/images/events-img3.jpg'),
];

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  image: any;
};

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'WMSU Palaro 2025',
    date: 'October 20 - 25, 2025',
    location: 'WMSU Campus A & Grandstand',
    image: require('@/assets/images/event1.jpg'),
  },
  {
    id: '2',
    title: 'WMSU Grand Alumni Homecoming',
    date: 'December 03 - 07, 2025',
    location: 'WMSU Campus A & Grandstand',
    image: require('@/assets/images/event2.jpg'),
  },
  {
    id: '3',
    title: 'Founding Anniversary Celebration',
    date: 'February 14, 2025',
    location: 'WMSU Campus A & Gymnasium',
    image: require('@/assets/images/event3.jpg'),
  },
];

const CATEGORIES = ['University Sports', 'WMSU Anniversary', 'Alumni Events', 'Cultural Festivities'];

export default function EventsScreen() {
  const router = useRouter();

  const { favorites, toggleFavorite } = useFavorites();

  const [index, setIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: index,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const translateX = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -width, -width * 2],
  });

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: '/eventsdetails',
          params: { id: item.id },
        })
      }
    >
      <Image source={item.image} style={styles.eventImage} resizeMode="cover" />

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventInfo}>
          <Ionicons name="calendar" size={14} color={MAROON} />
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="location" size={14} color={MAROON} />
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.heartBtn}
        onPress={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
      >
        <Ionicons
          name={favorites[item.id] ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites[item.id] ? '#FF6B6B' : '#fff'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        activeCategory === item && styles.categoryPillActive, 
      ]}
      activeOpacity={0.7}
      onPress={() => setActiveCategory(item)} 
      onPressIn={() => setActiveCategory(item)}
      onPressOut={() => {
      }}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item && styles.categoryTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

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

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroWrapper}>
          <Animated.View
            style={[
              styles.slidesContainer,
              { transform: [{ translateX }] },
            ]}
          >
            {HERO_IMAGES.map((img, i) => (
              <Image
                key={i}
                source={img}
                style={styles.heroImage}
                resizeMode="cover"
              />
            ))}
          </Animated.View>

          <View style={styles.dotsContainer}>
            {HERO_IMAGES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>University Events</Text>

        <FlatList
          data={EVENTS}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
        />

        <Text style={styles.categoryTitle}>Category Events</Text>

        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

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

  container: { paddingHorizontal: 0 },

  heroWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
    marginBottom: 24,
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  slidesContainer: {
    width: width * HERO_IMAGES.length,
    height: '100%',
    flexDirection: 'row',
  },
  heroImage: { width, height: '100%' },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: '#fff' },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.4)' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  carousel: { paddingLeft: 4, paddingRight: 16 },

  eventCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  eventImage: { width: '100%', height: 90 },
  eventContent: { padding: 10 },
  eventTitle: { fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 6 },
  eventInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  eventDate: { fontSize: 11, color: '#555', marginLeft: 6 },
  eventLocation: { fontSize: 11, color: '#555', marginLeft: 6 },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  categoryList: { paddingLeft: 4, paddingRight: 16 },
  categoryPill: {
    backgroundColor: '#f2d0d0ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryPillActive: { backgroundColor: '#910b0bff'},
  categoryTextActive: { fontSize: 12, color: '#ffffffff', fontWeight: '600' },
  categoryText: { fontSize: 12, color: '#971717ff', fontWeight: '600' },

  navItem: { alignItems: 'center', flex: 1 },
  navItemActive: { alignItems: 'center', flex: 1 },
  navLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  navLabelActive: { fontSize: 12, color: MAROON, marginTop: 4, fontWeight: '600' },
});