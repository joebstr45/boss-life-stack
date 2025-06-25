const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PASSCODE = process.env.PASSCODE || 'bossmoderide';

app.post('/api/validate', (req, res) => {
    const { code } = req.body;
    if (code === PASSCODE) {
        return res.json({ access: true });
    }
    return res.status(403).json({ access: false });
});

app.get('/api/status', (req, res) => {
    res.json({ status: "Backend is live." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});