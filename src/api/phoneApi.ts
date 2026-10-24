import { COLOR_ORDER, isColor, PHONES } from '../data/phones';
import { Phone } from '../types';

// Accept both the project base URL and a full /phones endpoint.
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '').replace(/\/phones$/, '');
export const USING_API = API_URL !== '';

export function parsePhone(value: unknown): Phone {
  if (!value || typeof value !== 'object') throw new Error('Dữ liệu sản phẩm không hợp lệ.');
  const p = value as Record<string, unknown>;
  const text = (key: string) => {
    const v = p[key];
    if (typeof v !== 'string' || !v.trim()) throw new Error(`Dữ liệu thiếu trường ${key}.`);
    return v;
  };
  const number = (key: string) => {
    const v = p[key];
    if ((typeof v !== 'number' && typeof v !== 'string') || v === '' || !Number.isFinite(Number(v)) || Number(v) < 0) {
      throw new Error(`Trường ${key} phải là số không âm.`);
    }
    return Number(v);
  };
  const available = Array.isArray(p.colors) ? p.colors.filter(isColor) : [];
  const phoneColors = available.length ? [...new Set(available)] : [...COLOR_ORDER];
  const defaultColor = isColor(p.defaultColor) && phoneColors.includes(p.defaultColor) ? p.defaultColor : phoneColors.includes('blue') ? 'blue' : phoneColors[0];
  return {
    id: text('id'), name: text('name'), price: number('price'), oldPrice: number('oldPrice'),
    rating: Math.min(5, Math.round(number('rating'))), reviewCount: Math.floor(number('reviewCount')),
    supplier: text('supplier'), badge: text('badge'), colors: phoneColors, defaultColor,
  };
}

export async function fetchPhone(id: string, signal?: AbortSignal): Promise<Phone> {
  if (!USING_API) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const phone = PHONES.find(p => p.id === id);
    if (!phone) throw new Error('Không tìm thấy sản phẩm');
    return phone;
  }
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, 15000);
  try {
    const response = await fetch(`${API_URL}/phones/${encodeURIComponent(id)}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Máy chủ trả về lỗi ${response.status}`);
    return parsePhone(await response.json());
  } catch (error) {
    if (controller.signal.aborted && !signal?.aborted) throw new Error('Kết nối quá thời gian. Vui lòng thử lại.');
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
