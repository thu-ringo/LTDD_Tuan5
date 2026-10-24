import { ActivityIndicator, Text, View } from 'react-native';
import { colors, common } from '../theme';

export function Loading() {
  return <View style={common.center} accessibilityLiveRegion="polite"><ActivityIndicator color={colors.blue} size="large" /><Text style={common.muted}>Đang tải...</Text></View>;
}
