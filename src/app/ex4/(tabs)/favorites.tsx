import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../../../data/phones';
import { ProductRow } from '../../../components/ProductRow';
import { colors, common } from '../../../theme';
import { useFavorites } from '../../../ex4/FavoritesContext';

export default function FavoritesTab() {
  const { ids } = useFavorites();
  return <FlatList style={common.page} data={PHONES.filter(p => ids.includes(p.id))} keyExtractor={p => p.id} contentContainerStyle={[common.list, { flexGrow: 1 }]} renderItem={({ item }) => <ProductRow phone={item} onPress={() => router.push({ pathname: '/ex4/product/[id]', params: { id: item.id } })} />} ListEmptyComponent={<View style={common.center}><Ionicons name="heart-outline" color={colors.muted} size={52} /><Text style={common.muted}>Chưa có sản phẩm nào được lưu.</Text></View>} />;
}
