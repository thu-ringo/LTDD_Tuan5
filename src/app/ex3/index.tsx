import { FlatList } from 'react-native';
import { PHONES } from '../../data/phones';
import { ProductRow } from '../../components/ProductRow';
import { common } from '../../theme';
export default function HomeTab() {
  return <FlatList style={common.page} data={PHONES} keyExtractor={p => p.id} contentContainerStyle={common.list} renderItem={({ item }) => <ProductRow phone={item} />} />;
}
