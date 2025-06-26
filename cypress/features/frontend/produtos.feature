Feature: Cadastro e exclusão de produto via interface de administrador

  Scenario: Cadastrar um novo produto com sucesso
    When o usuário acessa a página de cadastro de produtos
    And preenche os campos com nome, preço, descrição e quantidade
    And envia o formulário de cadastro
    Then o sistema deve redirecionar para a lista de produtos
    And o novo produto deve estar visível na listagem

  Scenario: Excluir um produto cadastrado
    Given que um produto foi cadastrado anteriormente
    When o usuário acessa a listagem de produtos
    And clica em "Excluir" para esse produto
    Then o produto não deve mais estar visível na listagem