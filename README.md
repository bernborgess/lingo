# Lingo - Language Activities

<img align="center" alt="typescript"
    src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img align="center" alt="nodejs"
    src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img align="center" alt="react"
    src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img align="center" alt="jest"
    src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" />
<img align="center" alt="mongo"
    src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
<img align="center" alt="prisma"
    src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img align="center" alt="docker"
  src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white" />

<!-- <img src="logo.jpg" alt="Lingo Logo"> -->


### Descrição do Sistema
Lingo é um sistema educacional interativo desenvolvido especificamente para a disciplina de "Teste de Software" da UFMG, 
visando fornecer uma plataforma robusta para o aprendizado da língua inglesa. 
Inspirado no popular aplicativo Duolingo, o Lingo permite que os usuários criem suas contas pessoais e progridam através de 
lições e exercícios estruturados para aprimorar suas habilidades no idioma.

### Tecnologias Utilizadas
O Lingo utiliza um conjunto de tecnologias modernas para fornecer uma experiência eficiente e envolvente aos usuários. Aqui está uma breve explicação sobre como cada uma dessas tecnologias é empregada no sistema:

- React: é a base do desenvolvimento front-end, permitindo a criação de uma aplicação web dinâmica e responsiva. Ele ajuda a organizar o código de maneira eficiente, oferecendo atualizações em tempo real e uma experiência interativa para os usuários.

- TypeScript: foi empregado para melhorar a escalabilidade e manutenibilidade do código. Com a adição de tipos estáticos, proporciona um desenvolvimento mais seguro, com detecção de erros durante a fase de desenvolvimento.

- MongoDB: é utilizado para armazenar os dados do aplicativo, sua estrutura orientada a documentos permite uma modelagem de dados ágil e eficaz, facilitando a manipulação e o armazenamento das informações das tarefas e usuários do sistema.

- Prisma: é integrado para facilitar as consultas e operações com o banco de dados. Ele oferece um conjunto de ferramentas que simplificam a interação com o banco de dados, permitindo um acesso mais intuitivo e eficiente aos dados.

- Express: é utilizado para criar e gerenciar o back-end do aplicativo, ele oferece um conjunto de funcionalidades para roteamento, lidar com requisições HTTP, gerenciamento de middleware e construção de APIs, permitindo uma comunicação eficaz entre o front-end e o banco de dados.

- Jest: é empregado para realizar testes de integração, ele oferece uma estrutura de testes completa, com funcionalidades para criar casos de teste, executar testes automatizados e fornecer relatórios detalhados sobre o desempenho do código. Ao integrar o Supertest com o Jest, é possível realizar testes de integração completos, verificando a interação entre o front-end, back-end e o banco de dados para assegurar o correto funcionamento do sistema.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão `20.11.1` ou minor mais recente de [Node.js](https://nodejs.org/en/download)
- Na pasta `server` você adicionou o arquivo `.env` com os valores adequados

## 🚀 Instalando Lingo

Para instalar o Lingo, siga estas etapas:

```
cd server
npm install
npx prisma generate
cd ../client
npm install
```

## ☕ Usando Lingo

Para executar Lingo, siga estas etapas:

```
cd server
npm run dev
```

Em outro terminal abra:

```
cd client
npm run dev
```

> Lembre-se de criar o arquivo .env dentro das pastas server e client

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/bernborgess">
        <img src="https://github.com/bernborgess.png"
        width="100px;"
        alt="Foto do Bernardo Borges"/><br>
        <sub>
          <b>Bernardo Borges</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Daniele-Cassia">
        <img src="https://github.com/Daniele-Cassia.png"
        width="100px;"
        alt="Foto da Daniele Cassia"/><br>
        <sub>
          <b>Daniele Cássia</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Ga-Alves">
        <img src="https://github.com/Ga-Alves.png"
        width="100px;"
        alt="Foto do Gabriel Alves"/><br>
        <sub>
          <b>Gabriel Alves Reis</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RdgFerreira">
        <img src="https://github.com/RdgFerreira.png"
        width="100px;"
        alt="Foto do Rodrigo Ferreira"/><br>
        <sub>
          <b>Rodrigo Ferreira</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
