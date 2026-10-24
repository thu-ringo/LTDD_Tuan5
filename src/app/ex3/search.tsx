import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../../data/phones';
import { ProductRow } from '../../components/ProductRow';
import { colors, common } from '../../theme';

export default function SearchTab() {
  const [keyword, setKeyword] = useState('');
  const results = useMemo(() => PHONES.filter(p => p.name.toLowerCase().includes(keyword.trim().toLowerCase())), [keyword]);
  return <View style={common.page}><View style={s.search}><Ionicons name="search-outline" size={22} color={colors.muted} /><TextInput accessibilityLabel="Tìm điện thoại" value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} autoCapitalize="none" autoCorrect={false} clearButtonMode="while-editing" /></View>
    <FlatList data={results} keyExtractor={p => p.id} keyboardShouldPersistTaps="handled" contentContainerStyle={common.list} renderItem={({ item }) => <ProductRow phone={item} />} ListEmptyComponent={<Text style={common.muted}>Không có kết quả cho “{keyword}”</Text>} />
  </View>;
}
const s = StyleSheet.create({ search: { margin: 16, marginBottom: 0, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.line, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 10 }, input: { flex: 1, minHeight: 48, fontSize: 16, color: colors.text } });
