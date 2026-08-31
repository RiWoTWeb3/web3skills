import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    launchOptions: {
      executablePath: '/usr/bin/google-chrome'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
