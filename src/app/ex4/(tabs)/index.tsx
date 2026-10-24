import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { PHONES } from '../../../data/phones';
import { ProductRow } from '../../../components/ProductRow';
import { common } from '../../../theme';

export default function ProductsTab() {
  return <FlatList style={common.page} data={PHONES} keyExtractor={p => p.id} contentContainerStyle={common.list} renderItem={({ item }) => <ProductRow phone={item} onPress={() => router.push({ pathname: '/ex4/product/[id]', params: { id: item.id } })} />} />;
}
