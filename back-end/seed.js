const pool = require('./src/config/database');

async function seed() {
  try {
    console.log('Limpando a tabela de produtos...');
    await pool.query('TRUNCATE TABLE produtos RESTART IDENTITY');
    console.log('Tabela limpa!');

    const sql = `
      INSERT INTO produtos (nome, preco, estoque, categoria) VALUES 
      ('Fresa de Topo Metal Duro 10mm', 120.50, 40, 'Ferramentas de Corte'),
      ('Pastilha de Metal Duro para Torno', 45.00, 200, 'Pastilhas e Insertos'),
      ('Eixo de Aço Carbono Trefilado', 320.00, 15, 'Eixos e Componentes'),
      ('Engrenagem Cilíndrica Dentes Retos', 150.00, 30, 'Transmissão'),
      ('Bucha de Bronze Sinterizado', 25.50, 100, 'Buchas e Rolamentos')
    `;

    console.log('Inserindo peças de usinagem...');
    await pool.query(sql);
    console.log('Peças cadastradas com sucesso!');

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    pool.end();
  }
}

// Aguardar um pouquinho para o database.js terminar de inicializar a criação de tabela caso seja a primeira vez
setTimeout(seed, 1000);
