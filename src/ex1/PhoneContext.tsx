import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPhone } from '../api/phoneApi';
import { ErrorBox } from '../components/ErrorBox';
import { Loading } from '../components/Loading';
import { BackToMenu } from '../components/BackToMenu';
import { PHONES } from '../data/phones';
import { Phone } from '../types';

const PhoneContext = createContext<{ phone: Phone; base: '/ex1' | '/ex2' } | null>(null);
export function usePhone() {
  const value = useContext(PhoneContext);
  if (!value) throw new Error('Màn hình phải nằm trong PhoneLayout');
  return value;
}

export function PhoneLayout({ api = false }: { api?: boolean }) {
  const { id = '1' } = useLocalSearchParams<{ id?: string }>();
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${id}:${attempt}`;
  const [result, setResult] = useState<{ key: string; phone: Phone | null; error: string | null } | null>(null);
  const phone = api ? result?.key === requestKey ? result.phone : null : PHONES[0];
  const error = api && result?.key === requestKey ? result.error : null;
  const retry = useCallback(() => setAttempt(n => n + 1), []);
  useEffect(() => {
    if (!api) return;
    const controller = new AbortController();
    fetchPhone(id, controller.signal).then(value => {
      if (!controller.signal.aborted) setResult({ key: requestKey, phone: value, error: null });
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) setResult({ key: requestKey, phone: null, error: reason instanceof Error ? reason.message : 'Không thể kết nối. Kiểm tra mạng và thử lại.' });
    });
    return () => controller.abort();
  }, [api, id, requestKey]);
  if (error || !phone) return <SafeAreaView style={{ flex: 1 }}><BackToMenu />{error ? <ErrorBox message={error} onRetry={retry} /> : <Loading />}</SafeAreaView>;
  return <PhoneContext.Provider value={{ phone, base: api ? '/ex2' : '/ex1' }}><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}><Stack.Screen name="index" /><Stack.Screen name="choose-color" /></Stack></PhoneContext.Provider>;
}
