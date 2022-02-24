const Blockchain = require('./blockchain');

const bdcoin = new Blockchain();


const previousBlockHash = 'WIOVJIV4F66V4ZDFBSZD3F';
const currentBlockData = [
    {
        amount: 102,
        sender: 'SDGVAFDIHV55DFV23DD',
        recipient: 'SDJFODFVH4SD4CS6'
    },
    {
        amount: 150,
        sender: 'SDGVAFDIHV55DFV23DD',
        recipient: 'SDJFODFVH4SD4CS6'
    },
    {
        amount: 250,
        sender: 'SDGVAFDIHV55DFV23DD',
        recipient: 'SDJFODFVH4SD4CS6'
    }
];


const nonce = bdcoin.proofOfWork(previousBlockHash, currentBlockData);

console.log(nonce);

console.log(bdcoin.hashBlock(previousBlockHash, currentBlockData, 42066));