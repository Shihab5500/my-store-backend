

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


let items = [
  { id: 1, name: 'Wireless Headphones', price: '2500 BDT', description: 'Premium noise cancelling.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
  { id: 2, name: 'Gaming Mouse', price: '1200 BDT', description: 'RGB high DPI mouse.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80' },
  { id: 3, name: 'Mechanical Keyboard', price: '3500 BDT', description: 'Blue switch keyboard.', image: 'https://i.ibb.co.com/V8SDTnv/Sd710429bf1784042a357e25de921b79b4.avif' },
];


app.get('/api/items', (req, res) => {
  res.json(items);
});


app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});


app.post('/api/items', (req, res) => {
  const { name, price, description, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and Price are required' });
  }

  const newItem = {
    id: items.length + 1, 
    name,
    price,
    description: description || 'No description provided.',
    image: image || 'https://placehold.co/600x400/png' 
  };

  items.push(newItem); 
  console.log('New Item Added:', newItem); 
  res.status(201).json(newItem);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
  });
}
module.exports = app;