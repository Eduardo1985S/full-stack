require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // Em desenvolvimento aceita qualquer localhost; em produção usa CORS_ORIGIN
    const allowedOrigin = process.env.CORS_ORIGIN;
    const isLocalhost = !origin || /^http:\/\/localhost(:\d+)?$/.test(origin);
    if (allowedOrigin ? origin === allowedOrigin : isLocalhost) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  }
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());

const prodpgRoutes = require('./src/routes/prodpgRoutes');
app.use('/produtos', prodpgRoutes);
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Produtos com PostgreSQL',
    versao: '3.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL'
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!!!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});
