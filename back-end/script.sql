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
('Fresa de Topo Metal Duro 10mm', 120.50, 40, 'Ferramentas de Corte'),
('Pastilha de Metal Duro para Torno', 45.00, 200, 'Pastilhas e Insertos'),
('Eixo de Aço Carbono Trefilado', 320.00, 15, 'Eixos e Componentes'),
('Engrenagem Cilíndrica Dentes Retos', 150.00, 30, 'Transmissão'),
('Bucha de Bronze Sinterizado', 25.50, 100, 'Buchas e Rolamentos');
