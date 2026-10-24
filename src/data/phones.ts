import { ImageSourcePropType } from 'react-native';
import { ColorKey, Phone } from '../types';

export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: ImageSourcePropType }> = {
  silver: { label: 'bạc', hex: '#C9EEFA', image: require('../../assets/phones/silver.png') },
  red: { label: 'đỏ', hex: '#F50000', image: require('../../assets/phones/red.png') },
  black: { label: 'đen', hex: '#000000', image: require('../../assets/phones/black.png') },
  blue: { label: 'xanh', hex: '#2A4494', image: require('../../assets/phones/blue.png') },
};
export const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue'];
export function isColor(value: unknown): value is ColorKey {
  return typeof value === 'string' && COLOR_ORDER.includes(value as ColorKey);
}

export const PHONES: Phone[] = [
  { id: '1', name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng', price: 1790000, oldPrice: 1790000, rating: 5, reviewCount: 828, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'blue' },
  { id: '2', name: 'Điện Thoại Vsmart Live 4 - Hàng chính hãng', price: 3990000, oldPrice: 4490000, rating: 5, reviewCount: 326, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'black' },
  { id: '3', name: 'Điện Thoại Vsmart Star 5 - Hàng chính hãng', price: 2290000, oldPrice: 2690000, rating: 4, reviewCount: 152, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'blue' },
  { id: '4', name: 'Điện Thoại Vsmart Active 3 - Hàng chính hãng', price: 2990000, oldPrice: 3490000, rating: 4, reviewCount: 247, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'red' },
  { id: '5', name: 'Điện Thoại Vsmart Aris Pro - Hàng chính hãng', price: 6490000, oldPrice: 7490000, rating: 5, reviewCount: 98, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'silver' },
  { id: '6', name: 'Điện Thoại Vsmart Bee 3 - Hàng chính hãng', price: 990000, oldPrice: 1190000, rating: 4, reviewCount: 73, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'black' },
];
