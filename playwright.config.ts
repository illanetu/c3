import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'file:///',
    headless: true,
  },
  // Один проект (Chromium) для простоты
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  // Указываем рабочую директорию, чтобы удобнее формировать путь к HTML
  retries: 0,
  reporter: 'list',
});


