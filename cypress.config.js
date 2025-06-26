const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {
      // configurações ou plugins aqui se necessário
    },
    specPattern: "cypress/e2e/frontend/**/*.cy.js",
  },
});
