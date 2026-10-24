import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BackToMenu } from '../../components/BackToMenu';
import { colors } from '../../theme';

const icons = {
  index: ['home', 'home-outline'],
  search: ['search', 'search-outline'],
  profile: ['person', 'person-outline'],
} as const;

export default function BottomTabApp() {
  return <Tabs screenOptions={({ route }) => ({
    tabBarActiveTintColor: colors.red,
    headerRight: () => <BackToMenu />,
    tabBarIcon: ({ focused, color, size }) => <Ionicons name={(icons[route.name as keyof typeof icons] ?? icons.index)[focused ? 0 : 1]} color={typeof color === 'string' ? color : colors.muted} size={size} />,
  })}>
    <Tabs.Screen name="index" options={{ title: 'Trang chủ' }} />
    <Tabs.Screen name="search" options={{ title: 'Tìm kiếm' }} />
    <Tabs.Screen name="profile" options={{ title: 'Cá nhân' }} />
  </Tabs>;
}
