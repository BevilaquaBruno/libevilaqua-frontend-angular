// server.js
const express = require('express');
const path = require('path');
const app = express();

const distPath = path.join(__dirname, 'dist/libevilaqua-angular');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});