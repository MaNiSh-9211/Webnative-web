const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.static(path.join(__dirname, 'public')));

// Simple "thanks" endpoint to show interaction from frontend
app.post('/thanks', (req, res) => {
  console.log('User has viewed drive list and sent thanks.');
  res.status(200).send('Thanks received.');
});

app.listen(PORT, () => {
  console.log(`Demo site running at http://localhost:${PORT}`);
});
