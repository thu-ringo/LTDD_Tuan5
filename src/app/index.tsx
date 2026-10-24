import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, common } from '../theme';

const exercises = [
  { href: '/ex1', title: 'Select Phone', description: 'Chọn màu điện thoại theo mẫu', icon: 'color-palette-outline' },
  { href: '/ex2', title: 'Select Phone + API', description: 'Dữ liệu trực tiếp từ MockAPI', icon: 'cloud-download-outline' },
  { href: '/ex3', title: 'Bottom Tab', description: 'Trang chủ · Tìm kiếm · Cá nhân', icon: 'apps-outline' },
  { href: '/ex4', title: 'Stack + Tab', description: 'Chi tiết sản phẩm và yêu thích', icon: 'heart-outline' },
  { href: '/ex5', title: 'Drawer', description: 'Menu bên và cài đặt giao diện', icon: 'menu-outline' },
] as const;

export default function LabMenu() {
  return <SafeAreaView style={common.page}><ScrollView contentContainerStyle={s.content}>
    <Text style={s.eyebrow}>THỰC HÀNH REACT NATIVE</Text><Text style={s.heading}>Lab 06</Text><Text style={s.subtitle}>Navigation</Text><Text style={common.muted}>Chọn một bài tập để bắt đầu.</Text>
    <View style={s.cards}>{exercises.map((item, index) => <Link key={item.href} href={item.href} asChild><Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.7 }]}><View style={s.icon}><Ionicons name={item.icon} color={colors.blue} size={26} /></View><View style={{ flex: 1, gap: 5 }}><Text style={s.number}>BÀI {index + 1}</Text><Text style={s.title}>{item.title}</Text><Text style={s.description}>{item.description}</Text></View><Ionicons name="chevron-forward" size={20} color={colors.muted} /></Pressable></Link>)}</View>
    <Text style={s.footer}>Expo · TypeScript · Expo Router</Text>
  </ScrollView></SafeAreaView>;
}
const s = StyleSheet.create({
  content: { padding: 24, paddingTop: 36 }, eyebrow: { color: colors.blue, fontSize: 11, fontWeight: '700', letterSpacing: 2 }, heading: { marginTop: 12, fontSize: 44, fontWeight: '800', color: colors.navy }, subtitle: { fontSize: 30, fontWeight: '600', color: colors.navy, marginBottom: 12 },
  cards: { gap: 12, marginTop: 28 }, card: { flexDirection: 'row', gap: 14, alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7ED' }, icon: { backgroundColor: '#EEF0FC', padding: 12, borderRadius: 12 }, number: { fontSize: 10, letterSpacing: 1, color: colors.muted, fontWeight: '700' }, title: { fontSize: 17, fontWeight: '700', color: colors.text }, description: { fontSize: 12, color: colors.muted, lineHeight: 18 }, footer: { marginTop: 28, textAlign: 'center', fontSize: 12, color: colors.muted },
});
