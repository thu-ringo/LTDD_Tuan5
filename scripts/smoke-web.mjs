import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { startServer } from './serve-web.mjs';

const server = await startServer(4174);
const chrome = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined);
const browser = await chromium.launch({ headless: true, ...(chrome && existsSync(chrome) ? { executablePath: chrome } : {}) });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
page.setDefaultTimeout(10000);
page.setDefaultNavigationTimeout(15000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = 'http://127.0.0.1:4174';
const endpoint = 'https://6aca21d63115bcc958206ff2.mockapi.io/phones/1';
const results = [];
await mkdir('artifacts/screenshots', { recursive: true });
async function capture(name) { await page.screenshot({ path: `artifacts/screenshots/${name}.png`, fullPage: true, animations: 'disabled' }); }
async function check(name, run) { await run(); results.push(name); console.log(`PASS: ${name}`); }
try {
  await check('Bài 1: bốn trạng thái và truyền màu quay lại', async () => {
    await page.goto(base);
    await page.getByText('Select Phone', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByText('4 MÀU-CHỌN MÀU', { exact: true }).filter({ visible: true })).toBeVisible();
    await capture('screen-01');
    await page.getByText('4 MÀU-CHỌN MÀU', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByText('Chọn một màu bên dưới:')).toBeVisible();
    await expect(page.getByText('Cung cấp bởi', { exact: false })).toHaveCount(0);
    await capture('screen-02');
    await page.getByRole('radio', { name: 'Màu đỏ', exact: true }).click();
    await expect(page.getByRole('radio', { name: 'Màu đỏ', exact: true })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByText('Cung cấp bởi Tiki Tradding', { exact: true }).filter({ visible: true })).toBeVisible();
    await capture('screen-03');
    await page.getByText('XONG', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByText('4 MÀU-CHỌN LOẠI', { exact: true }).filter({ visible: true })).toBeVisible();
    await expect(page.getByRole('img', { name: /màu đỏ/ }).first()).toBeVisible();
    await capture('screen-04');
    await page.getByText('4 MÀU-CHỌN LOẠI', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByRole('radio', { name: 'Màu đỏ', exact: true })).toHaveAttribute('aria-checked', 'true');
    await page.getByText('XONG', { exact: true }).filter({ visible: true }).click();
    await page.getByText('CHỌN MUA', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByText('Đã chọn sản phẩm', { exact: true }).filter({ visible: true })).toBeVisible();
    await page.getByText('ĐÓNG', { exact: true }).filter({ visible: true }).click();
  });
  await check('Bài 2: API thật, tải, lỗi và thử lại', async () => {
    await page.route(endpoint, async route => { await new Promise(resolve => setTimeout(resolve, 700)); await route.continue(); });
    await page.goto(`${base}/ex2`);
    await expect(page.getByText('Đang tải...', { exact: true }).filter({ visible: true })).toBeVisible();
    await expect(page.getByText('Điện Thoại Vsmart Joy 3 - Hàng chính hãng', { exact: true }).filter({ visible: true })).toBeVisible({ timeout: 20000 });
    await capture('ex2-api');
    await page.unroute(endpoint);
    await page.route(endpoint, route => route.fulfill({ status: 503, body: 'Unavailable' }));
    await page.reload();
    await expect(page.getByText('Máy chủ trả về lỗi 503', { exact: true }).filter({ visible: true })).toBeVisible();
    await capture('ex2-error');
    await page.unroute(endpoint);
    await page.getByText('THỬ LẠI', { exact: true }).filter({ visible: true }).click();
    await expect(page.getByText('4 MÀU-CHỌN MÀU', { exact: true }).filter({ visible: true })).toBeVisible({ timeout: 20000 });
  });
  await check('Bài 3: tìm aris, không có kết quả và Profile', async () => {
    await page.goto(`${base}/ex3/search`);
    await page.getByPlaceholder('Nhập từ khóa').fill('ARIS');
    await expect(page.getByText('Điện Thoại Vsmart Aris Pro', { exact: true }).filter({ visible: true })).toBeVisible();
    await expect(page.getByText('Điện Thoại Vsmart Live 4', { exact: true }).filter({ visible: true })).toHaveCount(0);
    await page.getByPlaceholder('Nhập từ khóa').fill('zzz');
    await expect(page.getByText('Không có kết quả cho “zzz”', { exact: true }).filter({ visible: true })).toBeVisible();
    await capture('ex3-search');
    await page.getByText('Cá nhân', { exact: true }).filter({ visible: true }).last().click();
    await expect(page.getByText('an.nguyen@example.com')).toBeVisible();
  });
  await check('Bài 4: ID, giá Live 4, thêm và bỏ yêu thích', async () => {
    await page.goto(`${base}/ex4`);
    await page.getByText('Điện Thoại Vsmart Live 4', { exact: true }).filter({ visible: true }).click();
    await expect(page).toHaveURL(/\/ex4\/product\/2$/);
    await expect(page.getByText('3.990.000 đ', { exact: true }).filter({ visible: true })).toBeVisible();
    await page.getByText('♡ Lưu vào yêu thích', { exact: true }).filter({ visible: true }).click();
    await capture('ex4-details');
    await page.goBack();
    await page.getByText('Yêu thích', { exact: true }).filter({ visible: true }).last().click();
    await expect(page).toHaveURL(/\/ex4\/favorites$/);
    await expect(page.getByText('Điện Thoại Vsmart Live 4', { exact: true })).toHaveCount(2);
    await expect(page.getByText('Điện Thoại Vsmart Live 4', { exact: true }).last()).toBeVisible();
    await page.getByText('Điện Thoại Vsmart Live 4', { exact: true }).last().click();
    await page.getByText('♥ Đã lưu', { exact: true }).filter({ visible: true }).click();
    await page.goBack();
    await expect(page.getByText('Chưa có sản phẩm nào được lưu.', { exact: true }).filter({ visible: true })).toBeVisible();
    await page.goto(`${base}/ex4/product/missing`);
    await expect(page.getByText('Không tìm thấy sản phẩm #missing', { exact: true }).filter({ visible: true })).toBeVisible();
  });
  await check('Bài 5: Drawer, Switch và chế độ tối dùng chung', async () => {
    await page.goto(`${base}/ex5/settings`);
    await expect(page.getByText('Thông báo: BẬT · Giao diện: sáng', { exact: true }).filter({ visible: true })).toBeVisible();
    await page.getByRole('switch', { name: 'Nhận thông báo' }).click();
    await page.getByRole('switch', { name: 'Giao diện tối' }).click();
    await expect(page.getByText('Thông báo: TẮT · Giao diện: tối', { exact: true }).filter({ visible: true })).toBeVisible();
    await capture('ex5-settings');
    await page.getByRole('button', { name: /Open drawer|Show navigation menu/ }).click();
    await expect(page.getByText('Trang chủ', { exact: true }).last()).toBeVisible();
    // Let the drawer's CSS slide finish before taking the evidence image.
    await page.waitForTimeout(400);
    await capture('ex5-drawer');
    await page.getByText('Cá nhân', { exact: true }).filter({ visible: true }).last().click();
    await expect(page.getByText('an.nguyen@example.com')).toBeVisible();
    const background = await page.getByText('an.nguyen@example.com').evaluate(element => getComputedStyle(element.parentElement).backgroundColor);
    expect(background).toBe('rgb(23, 29, 41)');
  });
  expect(errors).toEqual([]);
  await writeFile('artifacts/web-smoke-result.json', JSON.stringify({ passed: results, errors }, null, 2));
} catch (error) {
  await capture('failure');
  console.error((await page.locator('body').innerText()).slice(0, 6000));
  console.error('Browser errors:', errors);
  throw error;
} finally {
  await browser.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
