const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./src/tests/e2e",
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
    reuseExistingServer: true,
    timeout: 120000,
    url: "http://127.0.0.1:3000"
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});
