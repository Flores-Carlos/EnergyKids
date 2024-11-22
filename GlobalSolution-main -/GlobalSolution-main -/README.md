### Integrantes do Grupo
- Carlos - RM97528 - 2TDSPX
- Kaique - RM551165 - 2TDSPX
- Vinicius - RM98839 - 2TDSPX

---

### Visão Geral

O **EnergyKids App** é uma aplicação desenvolvida para educar e conscientizar crianças e jovens sobre práticas sustentáveis relacionadas à energia. O aplicativo também oferece funcionalidades para o gerenciamento de dispositivos eletrônicos, possibilitando cadastrar, editar, listar e excluir dispositivos com informações sobre seu consumo.

---

### Arquitetura

#### **Camada de Dados**
A lógica de armazenamento e recuperação de dados utiliza um sistema que simula a estrutura do Firebase. Isso inclui autenticação e armazenamento de informações de dispositivos e usuários.

#### **Camada de Serviços**
A lógica do negócio está distribuída por telas específicas, com funções para operações de CRUD e autenticação.

#### **Camada de Apresentação**
A interface do usuário é construída usando **React Native** e **React Native Paper**, oferecendo uma experiência intuitiva e responsiva.

---

### Design Patterns Utilizados

- **Simulação Firebase**: Simula os serviços Firebase (Authentication e Firestore) por meio de armazenamento local, facilitando a demonstração sem dependência de serviços externos.
- **Controller Pattern**: Cada tela do aplicativo é responsável por gerenciar suas funcionalidades específicas.
- **Componentização**: Uso de componentes reutilizáveis para melhorar a legibilidade e manutenção do código.

---

### Arquitetura do Aplicativo

O projeto é estruturado em uma abordagem **Monolítica**, onde todo o código de lógica, dados e apresentação está unificado no aplicativo.

---

### Instruções para Configuração e Execução

#### **Pré-requisitos**
1. **Node.js e npm**: Certifique-se de ter o Node.js instalado. [Baixe aqui](https://nodejs.org/).
2. **React Native CLI**: Instale o CLI do React Native para rodar o aplicativo.
3. **Dispositivo ou Emulador**: Android ou iOS.

#### **Passos para Configuração**
1. **Clone o Repositório**
    ```bash
    git clone https://github.com/Flores-Carlos/energykids.git
    cd EnergyKids
    ```

2. **Instale as Dependências**
    ```bash
    npm install
    ```

3. **Configure o Ambiente**
   - Certifique-se de que o arquivo `Icone.js` está em `assets` para emular o Firebase.

4. **Execute o Aplicativo**
    Para Android:
    ```bash
    npm run android
    ```
    Para iOS:
    ```bash
    npm run ios
    ```

---

### Funcionalidades de Autenticação

#### **Registro**
- **Descrição**: Permite que novos usuários criem contas com informações básicas como nome, idade, email e senha.
- **Simulação**: Os dados são armazenados localmente usando um sistema que simula o Firebase Authentication.

#### **Login**
- **Descrição**: Valida as credenciais do usuário para permitir acesso ao aplicativo.
- **Simulação**: Dados de autenticação são comparados com as informações salvas localmente.

---

### Funcionalidades de Gerenciamento de Dispositivos

#### **Adicionar Dispositivo**
- **Descrição**: Usuários podem cadastrar dispositivos eletrônicos com informações como nome, descrição e voltagem.
- **Simulação**: Os dados são salvos localmente, simulando o Firebase Firestore.

#### **Listar Dispositivos**
- **Descrição**: Exibe todos os dispositivos cadastrados, permitindo visualizar os dados.

#### **Editar Dispositivo**
- **Descrição**: Permite que os usuários editem dispositivos cadastrados, desde que sejam os criadores do registro.

#### **Excluir Dispositivo**
- **Descrição**: Os dispositivos podem ser excluídos pelos seus criadores.

---

### Testando o Aplicativo

1. **Login e Cadastro**:
   - Use emails e senhas fictícios para registrar novos usuários.
   - Realize login com os dados registrados para validar o fluxo.

2. **Gerenciamento de Dispositivos**:
   - Adicione dispositivos, verifique na listagem, edite e exclua.
   - Certifique-se de que as permissões de edição e exclusão funcionam conforme esperado.

---

### Futuro Planejado

1. **Integração Real com Firebase**:
   - Substituir a simulação pelo uso efetivo do Firebase Authentication e Firestore.
   - Adicionar funcionalidades como recuperação de senha e autenticação com redes sociais.

2. **Funcionalidades Avançadas**:
   - Relatórios sobre o consumo total dos dispositivos cadastrados.
   - Gamificação para incentivar boas práticas de economia de energia.

---

Essa documentação foi criada para servir como guia completo para o desenvolvimento e utilização do EnergyKids App.
