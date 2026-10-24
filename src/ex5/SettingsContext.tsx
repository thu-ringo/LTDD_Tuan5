import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Settings = { notify: boolean; dark: boolean; setNotify: (value: boolean) => void; setDark: (value: boolean) => void };
const SettingsContext = createContext<Settings | null>(null);
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(() => ({ notify, dark, setNotify, setDark }), [notify, dark]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings phải nằm trong SettingsProvider');
  return value;
}
