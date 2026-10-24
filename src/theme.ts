import { StyleSheet } from 'react-native';

export const colors = {
  red: '#F50000', blue: '#4F63C8', navy: '#0B1F5C', text: '#1F2430',
  muted: '#6B7280', line: '#D8DCE3', bg: '#F4F5F7', grey: '#C4C4C4', star: '#D9DC00',
};

export const formatPrice = (value: number) =>
  Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';

export const common = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  muted: { fontSize: 14, color: colors.muted, lineHeight: 22 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: { backgroundColor: colors.red, borderRadius: 6, minHeight: 46, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  list: { padding: 16, gap: 12 },
});
