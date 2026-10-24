import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import { BackToMenu } from '../components/BackToMenu';

export default function RootLayout() {
  return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><StatusBar style="dark" /><View style={{ flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 480 : undefined, alignSelf: 'center' }}>
    <Stack screenOptions={{ headerRight: () => <BackToMenu /> }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ex1" options={{ headerShown: false }} />
      <Stack.Screen name="ex2" options={{ headerShown: false }} />
      <Stack.Screen name="ex3" options={{ headerShown: false }} />
      <Stack.Screen name="ex4" options={{ headerShown: false }} />
      <Stack.Screen name="ex5" options={{ headerShown: false }} />
    </Stack>
  </View></SafeAreaProvider></GestureHandlerRootView>;
}
