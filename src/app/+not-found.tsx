import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { common } from '../theme';
export default function NotFound() { return <View style={common.center}><Text style={common.title}>Không tìm thấy màn hình</Text><Link href="/">Về menu Lab06</Link></View>; }
