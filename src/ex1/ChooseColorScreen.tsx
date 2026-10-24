import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { COLOR_ORDER, PHONE_COLORS, isColor } from '../data/phones';
import { colors, common, formatPrice } from '../theme';
import { ColorKey } from '../types';
import { usePhone } from './PhoneContext';

export default function ChooseColorScreen() {
  const { phone, base } = usePhone();
  const { color } = useLocalSearchParams<{ color?: string }>();
  const [picked, setPicked] = useState<ColorKey | undefined>(isColor(color) && phone.colors.includes(color) ? color : undefined);
  const [line1, ...rest] = phone.name.split(' - ');
  return <SafeAreaView style={s.root} edges={['top', 'bottom']}>
    <View style={s.header}>
      <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={s.thumb} resizeMode="contain" />
      <View style={s.headerText}><Text style={s.small}>{line1}</Text><Text style={s.small}>{rest.join(' - ')}</Text>
        {picked && <><Text style={s.detail}>Màu: <Text style={s.bold}>{PHONE_COLORS[picked].label}</Text></Text><Text style={s.detail}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text><Text style={s.price}>{formatPrice(phone.price)}</Text></>}
      </View>
    </View>
    <View style={s.body}><Text style={s.hint}>Chọn một màu bên dưới:</Text>
      <ScrollView contentContainerStyle={s.swatches}>
        {COLOR_ORDER.filter(key => phone.colors.includes(key)).map(key => <Pressable key={key} accessibilityRole="radio" accessibilityLabel={`Màu ${PHONE_COLORS[key].label}`} aria-checked={picked === key} onPress={() => setPicked(key)} style={[s.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && s.swatchOn]} />)}
      </ScrollView>
      <Pressable accessibilityRole="button" style={s.done} onPress={() => router.dismissTo({ pathname: base, params: picked ? { color: picked } : {} })}><Text style={common.buttonText}>XONG</Text></Pressable>
    </View>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' }, header: { flexDirection: 'row', minHeight: 136, padding: 8, gap: 12 },
  thumb: { width: 100, height: 120 }, headerText: { flex: 1, paddingTop: 6 }, small: { fontSize: 13, color: '#111', lineHeight: 18 }, detail: { marginTop: 8, fontSize: 13, color: '#111' }, bold: { fontWeight: '700' }, price: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  body: { flex: 1, backgroundColor: colors.grey, paddingHorizontal: 16, paddingTop: 10 }, hint: { fontSize: 15, color: '#111' },
  swatches: { alignItems: 'center', paddingVertical: 14, gap: 12, flexGrow: 1 }, swatch: { width: 80, height: 76 }, swatchOn: { borderWidth: 3, borderColor: '#555', boxShadow: '0px 2px 4px #0004' },
  done: { backgroundColor: colors.blue, minHeight: 44, borderWidth: 1, borderColor: '#C73765', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 8, marginTop: 12, boxShadow: '0px 3px 3px #0003' },
});
