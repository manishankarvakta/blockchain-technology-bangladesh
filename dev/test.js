const Blockchain = require('./blockchain');
const bdcoin = new Blockchain();

const BC1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1645983117004,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    }
    ],
    "pendingTransaction": [],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    };

const BC2 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1645983333859,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1645983397260,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1645983456397,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "aab6b33097f311ecb43aa59baad8dff8",
    "transactionId": "d0899f5097f311ecb43aa59baad8dff8"
    },
    {
    "amount": "20",
    "sender": "FSFDGHFG24BF2G4FD2G4H2DFHG4D2",
    "recipient": "DFB5FG4BFD54NBDF52G41N5BD3F4",
    "transactionId": "dd67145097f311ecb43aa59baad8dff8"
    },
    {
    "amount": "200",
    "sender": "FSFDGHFG24BF2G4FD2G4H2DFHG4D2",
    "recipient": "DFB5FG4BFD54NBDF52G41N5BD3F4",
    "transactionId": "dfcfafe097f311ecb43aa59baad8dff8"
    },
    {
    "amount": "80",
    "sender": "FSFDGHFG24BF2G4FD2G4H2DFHG4D2",
    "recipient": "DFB5FG4BFD54NBDF52G41N5BD3F4",
    "transactionId": "e50e75e097f311ecb43aa59baad8dff8"
    },
    {
    "amount": "80",
    "sender": "FSFDGHFG24BF2G4FD2G4H2DFHG4D2",
    "recipient": "DFB5FG4BFD54NBDF52G41N5BD3F4",
    "transactionId": "ed40643097f311ecb43aa59baad8dff8"
    }
    ],
    "nonce": 20709,
    "hash": "00004a09b0704eeb76a812f6fb81bf75465406ae3eb8ff52d2a0f731555e079e",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1645983535046,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "aab6b33097f311ecb43aa59baad8dff8",
    "transactionId": "f3c36a0097f311ecb43aa59baad8dff8"
    }
    ],
    "nonce": 167257,
    "hash": "0000459fc09df15c6addb1f8c6dd5ea784e4941c961127f5e924292be9efcbb8",
    "previousBlockHash": "00004a09b0704eeb76a812f6fb81bf75465406ae3eb8ff52d2a0f731555e079e"
    }
    ],
    "pendingTransaction": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "aab6b33097f311ecb43aa59baad8dff8",
    "transactionId": "22a3d76097f411ecb43aa59baad8dff7"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    };





    console.log(bdcoin.chainIsValid(BC2.chain));