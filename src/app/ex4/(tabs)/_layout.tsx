import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { useFavorites } from '../../../ex4/FavoritesContext';

export default function HomeTabs() {
  const { ids } = useFavorites();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.red }}>
    <Tabs.Screen name="index" options={{ title: 'Sản phẩm', tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'bag' : 'bag-outline'} color={typeof color === 'string' ? color : colors.muted} size={size} /> }} />
    <Tabs.Screen name="favorites" options={{ title: 'Yêu thích', tabBarBadge: ids.length || undefined, tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} color={typeof color === 'string' ? color : colors.muted} size={size} /> }} />
  </Tabs>;
}
