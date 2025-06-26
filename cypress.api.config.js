const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev", // base da API
    setupNodeEvents(on, config) {
      // configurações ou plugins aqui se necessário
    },
    specPattern: "cypress/e2e/api/**/*.cy.js",
  },
});
