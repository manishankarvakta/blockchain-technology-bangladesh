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

// get entaire blockchain
app.get('/blockchain', function (req, res) {
  res.send(bdcoin);
})

// create new transaction
app.post('/transaction', function (req, res) {
  const newTransaction = req.body;
  const blockIndex = bdcoin.addTransactionToPendingTransactions(newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}`});
})

// transaction broadcast
app.post('/transaction/broadcast', function (req, res) {
  const newTransaction = bdcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  bdcoin.addTransactionToPendingTransactions(newTransaction);

  const regPromises = [];
  bdcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });
  Promise.all(regPromises)
  .then(data => {
    res.json({ note: "Transaction Created and Broadcast Successfully." });
  })
});

// mine new block
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

// register node to network
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
      uri: newNodeUrl + '/register-node-bulk',
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
  const newNodeUrl = req.body.newNodeUrl;
  const nodeAllreadyPresent = bdcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bdcoin.currentNodeUrl !== newNodeUrl;
  if(nodeAllreadyPresent && notCurrentNode) bdcoin.networkNodes.push(newNodeUrl);
  res.json({note: "New node register successfully"});

}); 

app.post('/register-node-bulk', function(req, res){
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl =>{
    const nodeNotAlreadyPresent = bdcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bdcoin.currentNodeUrl !== networkNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode) bdcoin.networkNodes.push(networkNodeUrl);
  })
  res.json({note: "Bulk Registration Successfully"})
});

app.listen(port, function(){
  console.log(`Listening on: http://localhost:${port}`)
})