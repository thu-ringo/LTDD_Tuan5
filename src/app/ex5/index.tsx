import { Text, View } from 'react-native';
import { useSettings } from '../../ex5/SettingsContext';
import { common } from '../../theme';
export default function HomeScreen() {
  const { dark } = useSettings();
  return <View style={[common.center, { backgroundColor: dark ? '#171D29' : '#fff' }]}><Text style={[common.title, dark && { color: '#fff' }]}>Xin chào 👋</Text><Text style={[common.muted, dark && { color: '#BDC7D9' }]}>Mở menu ☰ để khám phá các màn hình.</Text></View>;
}
