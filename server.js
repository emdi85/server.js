const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: '*'}))

app.post('/autocomplete/street', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://themovemarket.com/autocomplete/street', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

