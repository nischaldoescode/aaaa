const express = require('express');
const { put, get } = require('@vercel/blob');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public'));
});

// Append data to a blob
app.post('/append-data', async (req, res) => {
  const { newData } = req.body;
  const fileName = 'credentials.txt';

  try {
    let existingContent = '';
    try {
      const blob = await get(fileName, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (blob) {
        existingContent = await blob.text();
      }
    } catch (err) {
      // file may not exist, so continue
    }

    const updatedContent = existingContent + newData + '\n';

    const blob = await put(fileName, updatedContent, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.json({ success: true, message: 'Data saved.' });
  } catch (error) {
    console.error('Blob write error:', error);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

// Fallback to index.html


module.exports = app;
