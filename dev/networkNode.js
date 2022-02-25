const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');

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


app.post('/register-and-broadcast-node', function(req, res){
  const newNodeUrl = req.body.newNodeUrl;
  if(bdcoin.networkNodes.indexOf(newNodeUrl) == -1) bdcoin.networkNodes.push(newNodeUrl);
  
  const regNodesPromises = [];
  
  bdcoin.networkNodes.forEach(networkNodeUrl =>{
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl},
      json: true
    };
    regNodesPromises.push(rp(requestOptions));
  });
  Promise.all(regNodesPromises)
  .then(data => {
    const bulkRegisterOptions = {
      uri: newNodeUrl+'register-node-bulk',
      method: 'POST',
      body: {allNetworkNodes: [...bdcoin.networkNodes, bdcoin.currentNodeUrl] },
      json: true
    }
    rp(bulkRegisterOptions);
  })
  .then(data => {
    res.json({ note: 'New Node registered with network successfully'})
  })
});


app.post('/register-node', function(req, res){

});

app.post('/register-node-bulk', function(req, res){

});

app.listen(port, function(){
  console.log(`Listening on: http://localhost:${port}`)
})