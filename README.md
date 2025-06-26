Carrinhos:

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


Produtos:

Feature: Gerenciamento de produtos via API

  Background:
    Given que o usuário está autenticado via API

  Scenario: Cadastrar um novo produto com sucesso
    When o usuário envia os dados de um novo produto válido
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"

  Scenario: Editar um produto existente
    Given que um produto foi previamente cadastrado
    When o usuário altera os dados do produto
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"

  Scenario: Listar todos os produtos
    When o usuário consulta a listagem de produtos
    Then o sistema deve retornar status 200
    And deve retornar uma lista de produtos

  Scenario: Excluir um produto cadastrado
    Given que um produto foi criado para exclusão
    When o usuário solicita a exclusão do produto
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"

  Scenario: Não permitir cadastro de produto com nome duplicado
    Given que um produto com um determinado nome já existe
    When o usuário tenta cadastrar outro produto com o mesmo nome
    Then o sistema deve retornar status 400
    And deve exibir a mensagem informando que o nome já existe


Usuarios:

Feature: Gerenciamento de usuários via API

  Scenario: Cadastrar um novo usuário com sucesso
    When o usuário envia os dados de um novo usuário válido
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"

  Scenario: Não permitir cadastro com e-mail já existente
    Given que já existe um usuário com o e-mail "fulano@qa.com"
    When o usuário tenta cadastrar outro com o mesmo e-mail
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Este email já está sendo usado"

  Scenario: Editar o usuário criado
    Given que um usuário foi previamente cadastrado
    When o usuário envia dados atualizados para esse usuário
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"

  Scenario: Listar todos os usuários
    When o usuário consulta a listagem de usuários
    Then o sistema deve retornar status 200
    And deve retornar uma lista de usuários

  Scenario: Excluir um usuário cadastrado
    Given que um usuário foi criado para exclusão
    When o usuário solicita a exclusão desse usuário
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"



cadastrarProdutos:

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


cadastrarUsuarios:

Feature: Cadastro de usuários via interface administrativa

  Scenario: Cadastrar um novo usuário com sucesso
    When o administrador acessa a página de cadastro de usuários
    And preenche o nome, e-mail, senha e marca o checkbox de administrador
    And envia o formulário de cadastro
    Then deve ser exibida a mensagem "Cadastro realizado com sucesso"
    And o novo usuário deve estar visível na listagem de usuários

  Scenario: Exibir erro ao tentar cadastrar usuário com e-mail já utilizado
    Given que já existe um usuário cadastrado com um e-mail específico
    When o administrador tenta cadastrar um novo usuário com o mesmo e-mail
    Then deve ser exibida a mensagem "Este email já está sendo usado"

login:

Feature: Login no sistema Serverest

  Scenario: Realizar login com sucesso
    Given que o usuário está na página de login
    When ele insere o e-mail "fulano@qa.com" e a senha "teste"
    And clica no botão de login
    Then ele deve ser redirecionado para a página "/admin/home"

  Scenario: Exibir erro ao logar com credenciais inválidas
    Given que o usuário está na página de login
    When ele insere o e-mail "teste@teste.com" e a senha "senhaerrada"
    And clica no botão de login
    Then deve ser exibida a mensagem "Email e/ou senha inválidos"
    And ele não deve ser redirecionado para a página "/admin/home"

