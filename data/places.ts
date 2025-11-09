import { ImageSourcePropType } from 'react-native';

export type Place = {
  id: string;
  title: string;
  description: string;
  location: string;
  days: string;
  hours: string;
  services: string[];
  image: ImageSourcePropType;
};

export const PLACES: Record<string, Place> = {
  '1': {
    id: '1',
    title: 'University Library',
    description:
      "University's Main Library has all the great books and digital resources, making it the academic heart of WMSU.",
    location: 'Campus A',
    days: 'Monday - Saturday',
    hours: '9:00 AM - 5:00 PM',
    services: ['Study Area', 'Computer Lab', 'Printing Services'],
    image: require('@/assets/images/library.jpg'),
  },
  '2': {
    id: '2',
    title: 'WMSU Canteen',
    description:
      "University's Main Canteen has the best food and drinks on campus. From affordable student meals to specialty coffee and snacks, it's the perfect spot to refuel between classes.",
    location: 'Campus A',
    days: 'Monday - Sunday',
    hours: '7:00 AM - 6:00 PM',
    services: ['Dining', 'Takeout', 'Group Seating'],
    image: require('@/assets/images/canteen.jpg'),
  },
  '3': {
    id: '3',
    title: 'Administration Building',
    description:
      "The Administration Building is the central hub for all student services, from enrollment and scholarships to ID issuance and academic advising.",
    location: 'Campus A',
    days: 'Monday - Friday',
    hours: '7:00 AM - 5:00 PM',
    services: ['Enrollment', 'Scholarships', 'ID Services'],
    image: require('@/assets/images/admin-office.jpg'),
  },
};