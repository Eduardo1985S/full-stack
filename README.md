# Full-Stack Inventory System

Este é o repositório principal contendo o projeto Full-Stack de um sistema de inventário para peças de usinagem. O projeto está dividido em duas partes principais: um back-end (API) e um front-end (Admin Panel).

## 📁 Estrutura do Projeto

```text
/full-stack
│
├── /back-end          # API em Node.js + Express + PostgreSQL
│   ├── /src           # Controllers, Models, Routes, Config
│   ├── .env           # Credenciais do banco (porta 3000)
│   ├── app.js         # Ponto de entrada do servidor
│   └── script.sql     # Script opcional para popular o banco
│
└── /front-end         # Painel Administrativo em React + Vite
    ├── /src           # Componentes, CSS e Serviços (Fetch API)
    ├── index.html     # Ponto de entrada do Front
    └── vite.config.js # Configuração do Vite (porta 5173)
```

## 🚀 Como Executar o Projeto Completo

Para que o sistema funcione corretamente, ambas as partes precisam estar rodando simultaneamente em terminais separados.

### Passo 1: Iniciando o Back-End
1. Abra um terminal e navegue até a pasta `back-end`:
   ```bash
   cd back-end
   ```
2. Instale as dependências caso ainda não tenha feito:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com as senhas corretas do seu PostgreSQL local.
4. Inicie a API:
   ```bash
   node app.js
   ```
   *A API estará rodando em `http://localhost:3000` e conectada ao banco de dados.*

### Passo 2: Iniciando o Front-End
1. Abra um **segundo terminal** e navegue até a pasta `front-end`:
   ```bash
   cd front-end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o painel administrativo:
   ```bash
   npm run dev
   ```
4. O terminal indicará o link local. Geralmente será `http://localhost:5173`. Acesse-o pelo navegador.

---

*Desenvolvido com foco em um CRUD completo, conectando banco de dados relacional e uma interface limpa e intuitiva baseada nos moldes clássicos de Admin Panel.*

<!-- CHECKPOINT id="ckpt_moikn6t8_vf7q0u" time="2026-04-28T11:57:31.580Z" note="auto" fixes=0 questions=0 highlights=0 sections="" -->
