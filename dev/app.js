const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const bdcoin = new Blockchain();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('BTB')
})

app.get('/blockchain', function (req, res) {
  res.send(bdcoin);
})

app.post('/transaction', function (req, res) {
  console.log(req.body)
  res.send(`transaction amount ${req.body.amount} bdcoin`)
})


app.get('/mine', function (req, res) {
  res.send('mine')
})


app.listen(3000, function(){
  console.log('Listening on: http://localhost:3000')
})