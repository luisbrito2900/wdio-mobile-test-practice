const config = {
  runner: "local",
  port: 4723,
  specs: ["./test/specs/**/*.js"],
  exclude: [],

  maxInstances: 10,
  capabilities: [
    {
      "appium:platforName": "Android",
      "appium:deviceName": "Android GoogleAPI Emulator",
      "appium:platformVersion": "12.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": path.join(process.cwd(), "app/android/"),
    },
  ],
  logLevel: "error",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 40000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["appium"],
  framework: "mocha",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
module.exports = { config };
