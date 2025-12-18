import { test, expect } from '@playwright/test';
import path from 'path';

function getCalculatorFileUrl() {
  const absolutePath = path.resolve(__dirname, '..', 'calculator.html');
  const normalized = absolutePath.replace(/\\/g, '/');
  return 'file:///' + normalized;
}

test.beforeEach(async ({ page }) => {
  await page.goto(getCalculatorFileUrl());
});

test('отображение начального значения 0', async ({ page }) => {
  const display = page.locator('#display');
  await expect(display).toHaveText('0');
});

test('ввод нескольких чисел через нажатие кнопок', async ({ page }) => {
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '3' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('123');
});

test('сложение двух чисел', async ({ page }) => {
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('12');
});

test('вычитание двух чисел', async ({ page }) => {
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: '-' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('5');
});

test('умножение двух чисел', async ({ page }) => {
  await page.getByRole('button', { name: '6' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('42');
});

test('деление двух чисел', async ({ page }) => {
  await page.getByRole('button', { name: '8' }).click();
  await page.getByRole('button', { name: '/' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('4');
});

test('деление на ноль показывает ошибку', async ({ page }) => {
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '/' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('Ошибка');
});

test('кнопка очистки сбрасывает результат', async ({ page }) => {
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('10');

  await page.getByRole('button', { name: 'C' }).click();
  await expect(display).toHaveText('0');
});

test('ввод десятичного числа и расчёт', async ({ page }) => {
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '.' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = page.locator('#display');
  await expect(display).toHaveText('3.5');
});


