import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { BackToMenu } from '../../components/BackToMenu';
import { SettingsProvider, useSettings } from '../../ex5/SettingsContext';
import { colors } from '../../theme';

const icons = { index: 'home-outline', profile: 'person-outline', settings: 'settings-outline' } as const;
function DrawerNavigator() {
  const { dark } = useSettings();
  return <><StatusBar style={dark ? 'light' : 'dark'} /><Drawer screenOptions={({ route }) => ({
    drawerActiveTintColor: colors.red,
    drawerInactiveTintColor: dark ? '#E2E8F0' : colors.text,
    drawerStyle: { backgroundColor: dark ? '#171D29' : '#fff' },
    headerStyle: { backgroundColor: dark ? '#171D29' : '#fff' },
    headerTintColor: dark ? '#fff' : colors.text,
    sceneStyle: { backgroundColor: dark ? '#171D29' : '#fff' },
    headerRight: () => <BackToMenu />,
    drawerIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons] ?? 'home-outline'} color={typeof color === 'string' ? color : colors.muted} size={size} />,
  })}>
    <Drawer.Screen name="index" options={{ title: 'Trang chủ' }} />
    <Drawer.Screen name="profile" options={{ title: 'Cá nhân' }} />
    <Drawer.Screen name="settings" options={{ title: 'Cài đặt' }} />
  </Drawer></>;
}
export default function DrawerApp() { return <SettingsProvider><DrawerNavigator /></SettingsProvider>; }
