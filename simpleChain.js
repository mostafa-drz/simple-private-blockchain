const SHA256 = require('crypto-js/sha256');
const {
    addDataToLevelDB,
    getLevelDBData,
    getNumberOfRecordsInDB
} = require('./levelSandbox');

class Block {
    constructor(data) {
        this.hash = "",
            this.height = 0,
            this.body = data,
            this.time = 0,
            this.previousBlockHash = ""
    }
}


class Blockchain {
    constructor() {
        this.addBlock(new Block("First block in the chain - Genesis block"));
    }
    addBlock(newBlock) {
        newBlock.height = this.chain.length;
        newBlock.time = new Date().getTime().toString().slice(0, -3);
        if (this.chain.length > 0) {
            newBlock.previousBlockHash = this.chain[this.chain.length - 1].hash;
        }

        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

        addDataToLevelDB(newBlock);
    }


    getBlockHeight() {
        return getNumberOfRecordsInDB();
    }
    getBlock(blockHeight) {
        return JSON.parse(JSON.stringify(getLevelDBData(blockHeight)));
    }

    validateBlock(blockHeight) {
        let block = this.getBlock(blockHeight);
        let blockHash = block.hash;
        block.hash = '';
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        if (blockHash === validBlockHash) {
            return true;
        } else {
            console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
            return false;
        }
    }

    validateChain() {
        let errorLog = [];
        const BLOCK_HEIGHT = this.getBlockHeight();
        for (var i = 0; i < BLOCK_HEIGHT; i++) {
            if (!this.validateBlock(i)) errorLog.push(i);
            let blockHash = this.getBlock(i).hash;
            let previousHash = this.getBlock(i + 1).previousBlockHash;
            if (blockHash !== previousHash) {
                errorLog.push(i);
            }
        }
        if (errorLog.length > 0) {
            console.log('Block errors = ' + errorLog.length);
            console.log('Blocks: ' + errorLog);
        } else {
            console.log('No errors detected');
        }
    }
}

module.exports = {
    Blockchain
}