## Blockchain Technology Bangladesh [BTB]

### Blockchain Constructor Function

```
Blockchain();
```
Prototype Functions
- create new block
```
Blockchain.createNewBlock(nonce, previousBlockHash, hash);
```
- get last block
```
Blockchain.getLastBlock();
```
- create new transaction
```
Blockchain.createNewTransaction(amount, sender, recipient);
```
- hash block
```
Blockchain.hashBlock(previousBlockHash, currentBlockData, nonce);
```
- proof of work
```
Blockchain.proofOfWork(previousBlockHash, currentBlockData);
```
