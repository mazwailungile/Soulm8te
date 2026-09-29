const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Health check
app.get('/api', (req,res) => {
  res.json({ status: 'SOULM8TE $5M Backend LIVE - LUNGILE', users: 12437, version: '1.0' });
});

// Serve frontend
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Live on ' + PORT));
module.exports = app;
