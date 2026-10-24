import { Link } from 'expo-router';
import { colors } from '../theme';

export function BackToMenu() {
  return <Link href="/" dismissTo style={{ padding: 12, color: colors.blue, fontWeight: '600' }}>Menu bài tập</Link>;
}
