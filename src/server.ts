const express = require('express');

const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.get('/countries', async (req, res) => {
  if (req.query.order && req.query.order !== 'asc' && req.query.order !== 'desc') {
    res.status(501).json('error');
  }
  const response = await axios.get('https://api.jsonbin.io/b/5f69afbe65b18913fc510ce8');
  let countriesArr = response.data;
  if (req.query.filter) {
    countriesArr = response.data.filter((country) => country.country
      .toLowerCase()
      .includes(req.query.filter.toLowerCase())
    || country.code.toLowerCase().includes(req.query.filter.toLowerCase()));
  }
  countriesArr.sort((a, b) => ((req.query.order === 'asc') ? a.vat - b.vat : b.vat - a.vat));
  res.json({ countries: countriesArr });
});

app.get('/reverse/:word', (req, res) => {
  const reversedWord = req.params.word.replace(/[aeiou]/g, (l) => l.toUpperCase()).split('').reverse().join('');
  res.json({ reversed: reversedWord });
});

app.get('/append', (req, res) => {
  const SIMPLE_ARRAY = process.env.SIMPLE_ARRAY.split(',');
  if (req.query.start) {
    SIMPLE_ARRAY.unshift(req.query.start);
  }
  if (req.query.end) {
    SIMPLE_ARRAY.push(req.query.end);
  }

  res.json(SIMPLE_ARRAY);
});

app.listen(port, () => console.log(`API listening on port: ${port}`));
