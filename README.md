### Integrantes do Grupo
- Carlos - RM97528 - 2TDSPX  
- Kaique - RM551165 - 2TDSPX  
- Vinicius - RM98839 - 2TDSPX  

---

### Visão Geral

O **EnergyKids App** é uma aplicação mobile desenvolvida para educar crianças e jovens sobre práticas sustentáveis relacionadas à energia. Além de conteúdo educativo, o aplicativo oferece funcionalidades para o gerenciamento de dispositivos eletrônicos, incluindo cadastro, edição, listagem e exclusão de dispositivos com informações detalhadas.

O aplicativo utiliza **Firebase** para autenticação de usuários e gerenciamento de dados, garantindo uma experiência confiável e moderna.

---

### Arquitetura

#### **Camada de Dados**
O **Firebase** é responsável por:
- **Autenticação**: Gerenciamento seguro de contas de usuários.
- **Firestore**: Armazenamento e recuperação de dados relacionados a dispositivos e usuários.

#### **Camada de Serviços**
A lógica de autenticação e CRUD (Create, Read, Update, Delete) está diretamente integrada aos serviços do Firebase, garantindo um fluxo eficiente e seguro.

#### **Camada de Apresentação**
Construída com **React Native**, a interface do EnergyKids é responsiva e otimizada para uma experiência de usuário agradável e acessível.

---

### Design Patterns Utilizados

- **Firebase Services**: Uso completo dos serviços do Firebase Authentication e Firestore para autenticação e armazenamento de dados.
- **Componentização**: Reutilização de componentes React Native para maior organização e escalabilidade.
- **Controller Pattern**: Cada tela do aplicativo gerencia suas operações específicas.

---

### Instruções para Configuração e Execução

#### **Pré-requisitos**
1. **Node.js e npm**: Certifique-se de que estão instalados. [Baixe aqui](https://nodejs.org/).
2. **Ambiente de Desenvolvimento do React Native**: Instale o CLI do React Native.
3. **Configuração Firebase**:
   - Configure o Firebase seguindo as instruções em [Firebase Console](https://console.firebase.google.com/).
   - Baixe o arquivo `google-services.json` para Android ou `GoogleService-Info.plist` para iOS e adicione ao projeto.

#### **Passos para Configuração**
1. **Clone o Repositório**
    ```bash
    git clone https://github.com/SeuUsuario/EnergyKids.git
    cd EnergyKids
    ```

2. **Instale as Dependências**
    ```bash
    npm install
    ```

3. **Configure o Firebase**
   - Certifique-se de que os arquivos `google-services.json` (Android) ou `GoogleService-Info.plist` (iOS) estão nos diretórios corretos.

4. **Execute o Aplicativo**
    ```bash
    npm start
    ```

---

### Funcionalidades de Autenticação

#### **Registro**
- **Descrição**: Permite que novos usuários criem contas fornecendo nome, idade, gênero, email e senha.  
- **Integração com Firebase**:  
    ```javascript
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Usuário registrado no Firebase!'));
    ```

#### **Login**
- **Descrição**: Valida as credenciais do usuário para conceder acesso ao aplicativo.  
- **Integração com Firebase**:  
    ```javascript
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('Login realizado com sucesso!'));
    ```

---

### Funcionalidades de Gerenciamento de Dispositivos

#### **Adicionar Dispositivo**
- **Descrição**: Permite cadastrar dispositivos com informações como nome, voltagem (watts) e descrição.  
- **Integração com Firebase**:  
    ```javascript
    firestore()
      .collection('devices')
      .add({ userId, deviceName, voltage, description })
      .then(() => console.log('Dispositivo adicionado ao Firestore!'));
    ```

#### **Listar Dispositivos**
- **Descrição**: Exibe todos os dispositivos cadastrados pelo usuário.  
- **Integração com Firebase**:  
    ```javascript
    firestore()
      .collection('devices')
      .where('userId', '==', currentUserId)
      .get()
      .then(querySnapshot => console.log(querySnapshot.docs));
    ```

#### **Editar Dispositivo**
- **Descrição**: Permite que os usuários editem os detalhes de dispositivos já cadastrados.  
- **Integração com Firebase**:  
    ```javascript
    firestore()
      .collection('devices')
      .doc(deviceId)
      .update({ deviceName, voltage, description })
      .then(() => console.log('Dispositivo atualizado no Firestore!'));
    ```

#### **Excluir Dispositivo**
- **Descrição**: Remove dispositivos cadastrados pelo usuário.  
- **Integração com Firebase**:  
    ```javascript
    firestore()
      .collection('devices')
      .doc(deviceId)
      .delete()
      .then(() => console.log('Dispositivo excluído do Firestore!'));
    ```

---

### Testando o Aplicativo

1. **Login e Registro**:
   - Crie contas fictícias e valide o fluxo de autenticação.
   - Realize login com as credenciais registradas.

2. **Gerenciamento de Dispositivos**:
   - Adicione dispositivos com informações relevantes.
   - Edite e exclua dispositivos cadastrados.

---

### Futuro Planejado

1. **Relatórios Avançados**:
   - Resumo do consumo total de energia baseado nos dispositivos cadastrados.

2. **Autenticação Social**:
   - Implementação de login com Google e Facebook.

3. **Expansão Multiplataforma**:
   - Desenvolvimento de uma versão web para maior acessibilidade.

---

Essa documentação detalha o uso do aplicativo **EnergyKids**, projetado para educar e promover práticas sustentáveis, utilizando o poder do Firebase para oferecer uma experiência robusta e segura.
