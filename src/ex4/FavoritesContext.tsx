import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

type Favorites = { ids: string[]; has: (id: string) => boolean; toggle: (id: string) => void };
const FavoritesContext = createContext<Favorites | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const toggle = useCallback((id: string) => setIds(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]), []);
  const value = useMemo(() => ({ ids, toggle, has: (id: string) => ids.includes(id) }), [ids, toggle]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error('useFavorites phải nằm trong FavoritesProvider');
  return value;
}
