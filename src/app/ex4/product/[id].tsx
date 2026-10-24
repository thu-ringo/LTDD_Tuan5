import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PHONES, PHONE_COLORS } from '../../../data/phones';
import { Stars } from '../../../components/Stars';
import { colors, common, formatPrice } from '../../../theme';
import { useFavorites } from '../../../ex4/FavoritesContext';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const phone = PHONES.find(p => p.id === id);
  const { has, toggle } = useFavorites();
  if (!phone) return <View style={common.center}><Text>Không tìm thấy sản phẩm #{id}</Text></View>;
  const saved = has(phone.id);
  return <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={s.content}>
    <Image source={PHONE_COLORS[phone.defaultColor].image} resizeMode="contain" style={s.image} />
    <Text style={common.title}>{phone.name}</Text><Stars value={phone.rating} /><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={common.muted}>Cung cấp bởi {phone.supplier}</Text>
    <Pressable accessibilityRole="button" accessibilityState={{ selected: saved }} onPress={() => toggle(phone.id)} style={[s.favorite, saved && { backgroundColor: '#FFF1F1' }]}><Ionicons name={saved ? 'heart' : 'heart-outline'} color={colors.red} size={24} /><Text style={s.favoriteText}>{saved ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}</Text></Pressable>
  </ScrollView>;
}
const s = StyleSheet.create({ content: { padding: 24, gap: 16 }, image: { height: 320, width: '100%' }, price: { fontSize: 24, fontWeight: '700', color: colors.red }, favorite: { borderWidth: 1, borderColor: colors.red, borderRadius: 8, padding: 14, gap: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, favoriteText: { color: colors.red, fontWeight: '700', fontSize: 16 } });
