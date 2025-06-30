describe("Cadastro de Produto", () => {
  const nomeProduto = `Produto Teste ${Date.now()}`;
  const preco = "99";
  const descricao = "Descrição do produto teste";
  const quantidade = "10";

  beforeEach(() => {
    cy.login();
  });

  it("Deve cadastrar um novo produto com sucesso", () => {
    cy.visit("/admin/cadastrarprodutos");

    cy.get('input[name="nome"]').type(nomeProduto);
    cy.get('input[name="price"]').type(preco);
    cy.get('textarea[name="description"]').type(descricao);
    cy.get('input[name="quantity"]').type(quantidade);

    cy.get('button[type="submit"]').click();

    cy.visit("/admin/listarprodutos");
    cy.contains(nomeProduto).should("exist");
  });

  it("Deve excluir o produto cadastrado", () => {
    cy.visit("/admin/listarprodutos");

    cy.get("tbody tr")
      .contains(nomeProduto)
      .should("exist")
      .then((cell) => {
        cy.wrap(cell)
          .parents("tr")
          .within(() => {
            cy.get(".btn-danger").click();
          });
      });

    cy.contains(nomeProduto, { timeout: 10000 }).should("not.exist");
  });
});
