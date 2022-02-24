const Blockchain = require('./blockchain');

const bdcoin = new Blockchain();
bdcoin.createNewBlock(1532,'JLDF556dvsvJ', 'KJSGDV23daAD');

bdcoin.createNewTransaction(100,'MANIJLDF556dSHdJ', 'ATIQKJSGD23dDFAD');

bdcoin.createNewBlock(15562,'JLDF556dSDvJ', 'KJSGDV23dSFAD');

bdcoin.createNewTransaction(50,'MANIJLDF556dSHdJ', 'ATIQKJSGD23dDFAD');
bdcoin.createNewTransaction(30,'MANIJLDF556dSHdJ', 'ATIQKJSGD23dDFAD');
bdcoin.createNewTransaction(120,'MANIJLDF556dSHdJ', 'ATIQKJSGD23dDFAD');

bdcoin.createNewBlock(23462,'JLDF556dSDDJ', 'KJSGDV2SAdSFAD');
 
console.log(bdcoin);
console.log('--------');
console.log(bdcoin.chain[1]);
console.log('--------');
console.log(bdcoin.chain[2]);