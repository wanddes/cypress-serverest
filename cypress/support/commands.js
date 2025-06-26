Cypress.Commands.add("login", () => {
  cy.visit("/login");

  cy.get('input[name="email"]').type("fulano@qa.com");
  cy.get('input[name="password"]').type("teste");
  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/home");
});

Cypress.Commands.add("loginApi", () => {
  cy.request({
    method: "POST",
    url: "https://serverest.dev/login",
    body: {
      email: "fulano@qa.com",
      password: "teste",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.authorization;
    Cypress.env("token", token);

    return token;
  });
});
