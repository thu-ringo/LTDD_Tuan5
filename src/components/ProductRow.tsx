import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Phone } from '../types';
import { Stars } from './Stars';

export const ProductRow = memo(function ProductRow({ phone, onPress }: { phone: Phone; onPress?: () => void }) {
  return <Pressable accessibilityRole={onPress ? 'button' : undefined} onPress={onPress} disabled={!onPress} style={s.card}>
    <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" />
    <View style={s.info}><Text style={s.name}>{phone.name.split(' - ')[0]}</Text><Stars value={phone.rating} size={17} /><Text style={s.price}>{formatPrice(phone.price)}</Text></View>
    {onPress && <Text style={s.arrow}>›</Text>}
  </Pressable>;
});
const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, gap: 16 },
  image: { width: 66, height: 88 }, info: { flex: 1, gap: 6 }, name: { fontSize: 15, fontWeight: '600', color: colors.text },
  price: { fontSize: 16, fontWeight: '700', color: colors.red }, arrow: { fontSize: 28, color: colors.muted },
});
