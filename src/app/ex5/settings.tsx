import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSettings } from '../../ex5/SettingsContext';
import { colors, common } from '../../theme';

export default function SettingsScreen() {
  const { notify, dark, setNotify, setDark } = useSettings();
  const text = { color: dark ? '#fff' : colors.text };
  return <View style={[s.root, { backgroundColor: dark ? '#171D29' : '#fff' }]}><Text style={[common.title, text]}>Tùy chọn của bạn</Text>
    <View style={s.row}><Text style={[s.label, text]}>Nhận thông báo</Text><Switch accessibilityLabel="Nhận thông báo" value={notify} onValueChange={setNotify} trackColor={{ true: colors.blue }} /></View>
    <View style={s.row}><Text style={[s.label, text]}>Giao diện tối</Text><Switch accessibilityLabel="Giao diện tối" value={dark} onValueChange={setDark} trackColor={{ true: colors.blue }} /></View>
    <Text accessibilityLiveRegion="polite" style={[common.muted, dark && { color: '#BDC7D9' }]}>Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện: {dark ? 'tối' : 'sáng'}</Text>
  </View>;
}
const s = StyleSheet.create({ root: { flex: 1, padding: 24, gap: 24 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line }, label: { fontSize: 16, flex: 1 } });
