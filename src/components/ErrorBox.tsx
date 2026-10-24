import { Pressable, Text, View } from 'react-native';
import { common } from '../theme';

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <View style={common.center}><Text style={common.title}>Không thể tải sản phẩm</Text><Text accessibilityRole="alert" style={common.muted}>{message}</Text><Pressable accessibilityRole="button" style={common.button} onPress={onRetry}><Text style={common.buttonText}>THỬ LẠI</Text></Pressable></View>;
}
