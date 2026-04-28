-- Script de Criação do Banco de Dados PostgreSQL
-- Para o backend api_produtos

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(255)   NOT NULL,
  preco      DECIMAL(10,2)  NOT NULL,
  estoque    INTEGER        NOT NULL,
  categoria  VARCHAR(100)   NOT NULL,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Opcional) Inserção de dados de exemplo
INSERT INTO produtos (nome, preco, estoque, categoria) VALUES 
('Notebook Dell XPS', 7500.00, 10, 'Eletrônicos'),
('Mouse Sem Fio Logitech', 150.00, 50, 'Acessórios'),
('Teclado Mecânico', 350.50, 30, 'Acessórios'),
('Monitor UltraWide LG', 2200.00, 15, 'Eletrônicos'),
('Mochila para Notebook', 250.00, 100, 'Acessórios');
