describe("Login no Serverest", () => {
  it("Deve realizar login com sucesso", () => {
    cy.visit("");

    cy.get('input[name="email"]').type("fulano@qa.com");
    cy.get('input[name="password"]').type("teste");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/admin/home");
  });

  it.only("Deve exibir mensagem de erro ao tentar logar com credenciais inválidas", () => {
    cy.visit("");

    cy.get('input[name="email"]').type("teste@teste.com");
    cy.get('input[name="password"]').type("senhaerrada");

    cy.get('button[type="submit"]').click();

    cy.contains("Email e/ou senha inválidos").should("be.visible");
    cy.url().should("not.include", "/admin/home");
  });
});
