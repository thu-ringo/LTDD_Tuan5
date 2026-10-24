import { Stack } from 'expo-router';
import { FavoritesProvider } from '../../ex4/FavoritesContext';
import { BackToMenu } from '../../components/BackToMenu';

export default function StackTabApp() {
  return <FavoritesProvider><Stack screenOptions={{ headerRight: () => <BackToMenu /> }}><Stack.Screen name="(tabs)" options={{ title: 'Cửa hàng' }} /><Stack.Screen name="product/[id]" options={{ title: 'Chi tiết sản phẩm' }} /></Stack></FavoritesProvider>;
}
