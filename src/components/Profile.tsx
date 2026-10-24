import { StyleSheet, Text, View } from 'react-native';
import { colors, common } from '../theme';

export function Profile({ dark = false }: { dark?: boolean }) {
  return <View style={[common.center, { backgroundColor: dark ? '#171D29' : '#fff' }]}>
    <View style={s.avatar}><Text style={s.initials}>NA</Text></View>
    <Text style={[common.title, dark && { color: '#fff' }]}>Nguyễn Văn An</Text>
    <Text style={[common.muted, dark && { color: '#BDC7D9' }]}>an.nguyen@example.com</Text>
  </View>;
}
const s = StyleSheet.create({ avatar: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8ECFF' }, initials: { fontSize: 32, fontWeight: '700', color: colors.blue } });
