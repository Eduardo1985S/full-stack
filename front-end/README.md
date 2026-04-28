# Front-end - Admin Panel

Projeto Front-end em React + Vite criado para consumir a API de gerenciamento de inventário (Usinagem).

## Tecnologias
- **React (Vite)**
- **Vanilla CSS** (Estilo clássico Admin Panel)
- **Fetch API** nativa para requisições HTTP
- **Lucide-React** para ícones
- **React-Hot-Toast** para notificações flutuantes

## Estrutura Visual
- **Sidebar:** Navegação principal (Dashboard, Inventory).
- **Topbar:** Identificação do sistema e do usuário logado.
- **Tabela de Dados:** Exibição clara de colunas com opções de visualização, edição e exclusão.
- **Formulários Modais:** Adição e Edição de registros de forma flutuante sem sair da tela principal.
- **Modal de Confirmação:** Tela customizada para confirmação de exclusão (adeus `window.confirm`).

## Rodando o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173`.

*(Certifique-se de que o backend na porta 3000 esteja rodando para exibir os dados).*
