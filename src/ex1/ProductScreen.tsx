import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { PHONE_COLORS, isColor } from '../data/phones';
import { Stars } from '../components/Stars';
import { colors, common, formatPrice } from '../theme';
import { usePhone } from './PhoneContext';

export default function ProductScreen() {
  const { phone, base } = usePhone();
  const { color } = useLocalSearchParams<{ color?: string }>();
  const picked = isColor(color) && phone.colors.includes(color) ? color : undefined;
  const shown = picked ?? phone.defaultColor;
  const [purchase, setPurchase] = useState(false);
  return <SafeAreaView style={s.root}>
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.imageWrap}><Image accessibilityLabel={`${phone.name}, màu ${PHONE_COLORS[shown].label}`} source={PHONE_COLORS[shown].image} style={s.image} resizeMode="contain" /></View>
      <View style={s.info}>
        <Text style={s.name}>{phone.name}</Text>
        <View style={s.row}><Stars value={phone.rating} /><Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text></View>
        <View style={s.row}><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text></View>
        <View style={s.badgeRow}><Text style={s.badge}>{phone.badge}</Text><Text accessibilityLabel="Cam kết hoàn tiền khi tìm được nơi rẻ hơn" style={s.question}>?</Text></View>
        <Pressable accessibilityRole="button" style={s.chooseBtn} onPress={() => router.push({ pathname: `${base}/choose-color`, params: picked ? { color: picked } : {} })}><Text style={s.chooseText}>{phone.colors.length} MÀU-CHỌN {picked ? 'LOẠI' : 'MÀU'}</Text><Text style={s.chevron}>›</Text></Pressable>
      </View>
    </ScrollView>
    <Pressable accessibilityRole="button" style={s.buy} onPress={() => setPurchase(true)}><Text style={common.buttonText}>CHỌN MUA</Text></Pressable>
    <Modal visible={purchase} transparent animationType="fade" onRequestClose={() => setPurchase(false)}><View style={s.overlay}><View style={s.dialog}><Text style={common.title}>Đã chọn sản phẩm</Text><Text style={s.name}>{phone.name}</Text><Text>Màu: {PHONE_COLORS[shown].label}</Text><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={common.muted}>Đây là bài thực hành, chưa có chức năng thanh toán.</Text><Pressable accessibilityRole="button" style={common.button} onPress={() => setPurchase(false)}><Text style={common.buttonText}>ĐÓNG</Text></Pressable></View></View></Modal>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 }, content: { flexGrow: 1, paddingTop: 8, paddingBottom: 20 },
  imageWrap: { flex: 1, minHeight: 260, maxHeight: 430, alignItems: 'center', justifyContent: 'center' }, image: { width: '94%', height: '100%', maxHeight: 420 },
  info: { paddingTop: 10, gap: 10 }, name: { fontSize: 14, color: '#111', lineHeight: 21 }, row: { flexDirection: 'row', alignItems: 'center', gap: 28, flexWrap: 'wrap' },
  review: { fontSize: 12, color: '#111' }, price: { fontWeight: '700', fontSize: 18, color: '#111' }, oldPrice: { fontSize: 13, color: '#555', textDecorationLine: 'line-through' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, badge: { color: colors.red, fontSize: 11, fontWeight: '700' }, question: { borderWidth: 1, borderColor: '#333', borderRadius: 9, width: 17, height: 17, textAlign: 'center', fontSize: 12 },
  chooseBtn: { borderColor: '#999', borderWidth: 1, borderRadius: 6, minHeight: 36, alignItems: 'center', justifyContent: 'center', boxShadow: '0px 2px 3px #00000020' },
  chooseText: { fontSize: 13 }, chevron: { position: 'absolute', right: 12, fontSize: 26, lineHeight: 28 },
  buy: { backgroundColor: colors.red, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 6, marginTop: 12, marginBottom: 10, boxShadow: '0px 3px 3px #00000030' },
  overlay: { flex: 1, backgroundColor: '#0008', alignItems: 'center', justifyContent: 'center', padding: 24 }, dialog: { backgroundColor: '#fff', padding: 24, borderRadius: 16, width: '100%', maxWidth: 400, gap: 16 },
});
