import { readFile, writeFile, mkdir } from 'node:fs/promises';

const base = (process.env.EXPO_PUBLIC_API_URL || 'https://6aca21d63115bcc958206ff2.mockapi.io').replace(/\/+$/, '').replace(/\/phones$/, '');
const phones = JSON.parse(await readFile(new URL('../mockapi_phones.json', import.meta.url), 'utf8'));
if (!process.argv.includes('--apply')) {
  console.log(`Xem trước: cập nhật ID 1–6 tại ${base}/phones. Các ID khác được giữ nguyên.`);
  console.table(phones.map(({ id, name, price }) => ({ id, name, price })));
  console.log('Thực hiện: node --env-file=.env scripts/seed-mockapi.mjs --apply');
  process.exit(0);
}
async function request(path, options) {
  const response = await fetch(`${base}/phones${path}`, { ...options, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
  return response.json();
}
const before = await request('');
if (!Array.isArray(before)) throw new Error('API phải trả về danh sách.');
for (const phone of phones) {
  if (!before.some(p => p.id === phone.id)) throw new Error(`Thiếu bản ghi #${phone.id}; dừng để tránh tạo ID sai.`);
}
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
await writeFile(new URL(`../artifacts/mockapi-before-${stamp}.json`, import.meta.url), JSON.stringify(before, null, 2));
for (const phone of phones) {
  await request(`/${phone.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(phone) });
  const actual = await request(`/${phone.id}`);
  for (const key of Object.keys(phone)) {
    if (JSON.stringify(actual[key]) !== JSON.stringify(phone[key])) throw new Error(`Xác minh thất bại #${phone.id}.${key}`);
  }
  console.log(`Đã cập nhật và xác minh #${phone.id}: ${phone.name}`);
}
const after = await request('');
if (after.length !== before.length) throw new Error('Số lượng bản ghi đã thay đổi ngoài dự kiến.');
const changedIds = new Set(phones.map(p => p.id));
for (const phone of before.filter(p => !changedIds.has(p.id))) {
  if (JSON.stringify(after.find(p => p.id === phone.id)) !== JSON.stringify(phone)) throw new Error(`Bản ghi #${phone.id} đã thay đổi ngoài phạm vi.`);
}
await writeFile(new URL('../artifacts/mockapi-verified.json', import.meta.url), JSON.stringify(after, null, 2));
console.log(`Xác minh thành công: ${after.length} bản ghi, chỉ cập nhật ID 1–6.`);
