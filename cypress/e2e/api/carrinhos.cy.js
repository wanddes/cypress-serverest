describe("Fluxo completo - Usuário, Produto, Carrinho e Estoque", () => {
  let token = "";
  let produtoId = "";
  let quantidadeInicial = 10;

  const email = `usuario_${Date.now()}@teste.com`;

  it("Deve realizar o fluxo completo e verificar baixa no estoque", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Usuário Estoque",
        email: email,
        password: "123456",
        administrador: "true",
      },
    }).then((resUsuario) => {
      expect(resUsuario.status).to.eq(201);

      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: email,
          password: "123456",
        },
      }).then((resLogin) => {
        expect(resLogin.status).to.eq(200);
        token = resLogin.body.authorization;

        cy.request({
          method: "POST",
          url: "/produtos",
          headers: {
            Authorization: token,
          },
          body: {
            nome: `Produto Estoque ${Date.now()}`,
            preco: 100,
            descricao: "Produto para teste de estoque",
            quantidade: quantidadeInicial,
          },
        }).then((resProduto) => {
          expect(resProduto.status).to.eq(201);
          produtoId = resProduto.body._id;

          cy.request({
            method: "POST",
            url: "/carrinhos",
            headers: {
              Authorization: token,
            },
            body: {
              produtos: [
                {
                  idProduto: produtoId,
                  quantidade: 2,
                },
              ],
            },
          }).then((resCarrinho) => {
            expect(resCarrinho.status).to.eq(201);

            cy.request({
              method: "DELETE",
              url: "/carrinhos/concluir-compra",
              headers: {
                Authorization: token,
              },
            }).then((resCompra) => {
              expect(resCompra.status).to.eq(200);
              expect(resCompra.body.message).to.include("sucesso");

              cy.request({
                method: "GET",
                url: `/produtos/${produtoId}`,
              }).then((resFinalProduto) => {
                expect(resFinalProduto.status).to.eq(200);
                const quantidadeFinal = resFinalProduto.body.quantidade;
                expect(quantidadeFinal).to.eq(quantidadeInicial - 2);
              });
            });
          });
        });
      });
    });
  });

  it("Deve cancelar a compra e manter o estoque inalterado", () => {
    const emailCancel = `usuario_cancel_${Date.now()}@teste.com`;
    let produtoIdCancel = "";
    let tokenCancel = "";

    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Usuário Cancelamento",
        email: emailCancel,
        password: "123456",
        administrador: "true",
      },
    }).then((resUsuario) => {
      expect(resUsuario.status).to.eq(201);

      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: emailCancel,
          password: "123456",
        },
      }).then((resLogin) => {
        expect(resLogin.status).to.eq(200);
        tokenCancel = resLogin.body.authorization;

        cy.request({
          method: "POST",
          url: "/produtos",
          headers: { Authorization: tokenCancel },
          body: {
            nome: `Produto Cancelado ${Date.now()}`,
            preco: 150,
            descricao: "Produto cancelado",
            quantidade: 6,
          },
        }).then((resProduto) => {
          expect(resProduto.status).to.eq(201);
          produtoIdCancel = resProduto.body._id;

          cy.request({
            method: "POST",
            url: "/carrinhos",
            headers: { Authorization: tokenCancel },
            body: {
              produtos: [
                {
                  idProduto: produtoIdCancel,
                  quantidade: 3,
                },
              ],
            },
          }).then((resCarrinho) => {
            expect(resCarrinho.status).to.eq(201);

            cy.request({
              method: "DELETE",
              url: "/carrinhos/cancelar-compra",
              headers: { Authorization: tokenCancel },
            }).then((resCancel) => {
              expect(resCancel.status).to.eq(200);
              expect(resCancel.body.message).to.include("sucesso");

              cy.request({
                method: "GET",
                url: `/produtos/${produtoIdCancel}`,
              }).then((resProdutoFinal) => {
                expect(resProdutoFinal.status).to.eq(200);
                expect(resProdutoFinal.body.quantidade).to.eq(6);
              });
            });
          });
        });
      });
    });
  });
});
