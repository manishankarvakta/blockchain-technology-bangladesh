const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid');

const nodeAddress = uuid.v1().split('-').join('');

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
  const blockIndex = bdcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}.`});
})


app.get('/mine', function (req, res) {
  const lastBlock = bdcoin.getLastBlock();
  const previousBlockHash =  lastBlock['hash'];
  const currentBlockData = {
    transactions: bdcoin.pendingTransaction,
    index: lastBlock['index'] + 1
  }

  const nonce = bdcoin.proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = bdcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bdcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = bdcoin.createNewBlock(nonce, previousBlockHash, blockHash)
  res.json({
    note: "New block mined Successfully",
    block: newBlock
  })
})


app.listen(3000, function(){
  console.log('Listening on: http://localhost:3000')
})