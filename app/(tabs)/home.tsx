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
} from 'react-native';
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const MAROON = '#9a0101ff';
const SLIDE_DURATION = 4000;

const HERO_IMAGES = [
  require('@/assets/images/wmsu-hero1.jpg'),
  require('@/assets/images/wmsu-hero2.jpg'),
  require('@/assets/images/wmsu-hero3.jpg'),
];

export default function MainDashboard() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

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

  return (
    <SafeArea style={styles.safe}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/wmsu-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>WMSU Campus Guide</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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

        <Text style={styles.sectionTitle}>Where to go?</Text>

        <TouchableOpacity
          style={styles.campusRow}
          onPress={() => router.push('/(tabs)/places')}
          activeOpacity={0.9}
        >
          <Image
            source={require('@/assets/images/wmsu-campusA.jpg')}
            style={styles.campusImageLeft}
            resizeMode="cover"
          />
          <View style={styles.campusTextRight}>
            <Text style={styles.campusTitle}>Campus A</Text>
            <Text style={styles.campusDesc}>
              WMSU's Main Campus has the best places to go. Check out the departments of Nursing, Education, Architecture, Engineering, Home Economics, as well as the canteens!
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.campusRow}
          onPress={() => router.push('/(tabs)/places')}
          activeOpacity={0.9}
        >
          <View style={styles.campusTextLeft}>
            <Text style={styles.campusTitle}>Campus B</Text>
            <Text style={styles.campusDesc}>
              On the other hand, Campus B also has great places to visit too! Check out departments of Computing Studies, Criminology, LS – High School, the canteens as well!
            </Text>
          </View>
          <Image
            source={require('@/assets/images/wmsu-campusB.jpg')}
            style={styles.campusImageRight}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.description}>
        <Text style={styles.descriptionText}>
            Western Mindanao State University, the university by choice, stands as a beacon of academic excellence in Zamboanga City. 
            With a rich history spanning over a century, WMSU offers diverse programs in education, engineering, nursing, arts, 
            and sciences. Our two vibrant campuses — Campus A and Campus B — are home to state-of-the-art facilities, 
            passionate faculty, and a thriving student community dedicated to leadership, innovation, and service.
        </Text>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeArea>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  container: {
    paddingHorizontal: 0,
  },

  heroWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
    marginBottom: 24,
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  slidesContainer: {
    width: width * HERO_IMAGES.length,
    height: '100%',
    flexDirection: 'row',
  },
  heroImage: {
    width,
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },

  sectionTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  campusRow: {
    flexDirection: 'row',
    backgroundColor: '#edf7f9ff',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  campusImageLeft: {
    width: width * 0.45,
    height: 232,
  },
  campusTextRight: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  campusTextLeft: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  campusImageRight: {
    width: width * 0.45,
    height: 232,
  },
  campusTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  campusDesc: {
    fontSize: 13.5,
    color: '#555',
    lineHeight: 19,
  },

  description: {
  paddingHorizontal: 30,
  marginTop: 30,
 },
  descriptionText: {
  color: '#383737',
  fontSize: 15,
  lineHeight: 22,
  fontWeight: '500',
  textAlign: 'left',
  },
});