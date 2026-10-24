import { Profile } from '../../components/Profile';
import { useSettings } from '../../ex5/SettingsContext';
export default function ProfileScreen() { const { dark } = useSettings(); return <Profile dark={dark} />; }
