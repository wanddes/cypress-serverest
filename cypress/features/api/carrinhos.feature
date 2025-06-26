Feature: Fluxo completo de compra e validação de estoque

  Scenario: Usuário realiza uma compra com sucesso e o estoque é reduzido
    Given que um novo usuário está cadastrado
    And o usuário está autenticado
    And um produto com quantidade 10 foi cadastrado
    When o usuário adiciona 2 unidades do produto ao carrinho
    And finaliza a compra
    Then o estoque do produto deve ser reduzido para 8

  Scenario: Usuário cancela a compra e o estoque permanece o mesmo
    Given que um novo usuário de cancelamento está cadastrado
    And o usuário de cancelamento está autenticado
    And um produto com quantidade 6 foi cadastrado para cancelamento
    When o usuário adiciona 3 unidades do produto ao carrinho
    And cancela a compra
    Then o estoque do produto deve continuar com 6 unidades