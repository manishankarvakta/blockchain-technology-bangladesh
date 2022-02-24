const Blockchain = require('./blockchain');

const bdcoin = new Blockchain();


const previousBlockHash = 'WIOVJIV4F66V4ZDFBSZD3F';
const currentBlockData = [
    {
        amount: 10,
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

const nonce = 100;

const hash = bdcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

console.log(hash);