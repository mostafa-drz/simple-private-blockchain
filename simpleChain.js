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

export default class Blockchain {
    constructor() {
        this.addBlock(new Block("First block in the chain - Genesis block"));
    }
    addBlock(newBlock) {
        return new Promise(async(resolve, reject) => {
            try {
                const height = await this.getBlockHeight();
                newBlock.height = height;
                newBlock.time = new Date().getTime().toString().slice(0, -3);
                newBlock.hash = '';
                if (height > 0) {
                    const lastBlock = await this.getBlock(height - 1);
                    newBlock.previousBlockHash = lastBlock.hash;
                }
                newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                addDataToLevelDB(JSON.stringify(newBlock)).then((value) => {
                    resolve(value);
                }).catch((err) => {
                    reject({
                        error: {
                            message: 'Something went wrong when tried to add a block to the chain',
                            main: err
                        }
                    })
                })
            } catch (err) {
                reject({
                    error: {
                        message: 'Something went wrong when tried to add a block to the chain',
                        main: err
                    }
                })
            }
        });

    }

    getBlockHeight() {
        return new Promise((resolve, reject) => {
            getNumberOfRecordsInDB().then((height) => {
                return resolve(height);
            }).catch((err) => {
                return reject({
                    error: {
                        message: 'Something went wrong when tried to get the height of the chain',
                        main: err
                    }
                })
            })
        });
    }
    getBlock(blockHeight) {
        return new Promise(async(resolve, reject) => {
            const height = await this.getBlockHeight();
            if (blockHeight > height) {
                return reject({
                    error: {
                        message: 'Invalid Block number'
                    }
                })
            }
            getLevelDBData(blockHeight).then((data) => {
                return resolve(JSON.parse(data));
            }).catch((err) => {
                return reject({
                    error: {
                        message: "Something went wrong when tried to get the block",
                        main: err
                    }
                })
            })
        });
    }

    validateBlock(blockHeight) {
        return new Promise(async(resolve, reject) => {
            const chainHeight = await this.getBlockHeight();
            if (blockHeight > chainHeight) {
                return reject({
                    error: {
                        message: 'Invalid block number'
                    }
                });
            }
            this.getBlock(blockHeight).then((block) => {
                let blockHash = block.hash;
                block.hash = '';
                let validBlockHash = SHA256(JSON.stringify(block)).toString();
                if (blockHash === validBlockHash) {
                    return resolve({
                        valid: true
                    });
                } else {
                    return resolve({
                        valid: false
                    });
                }
            }).catch((err) => {
                return reject({
                    error: {
                        message: 'Something went wrong when tried to validate the block',
                        main: err
                    }
                })
            })

        });
    }

    validateChain() {
        return new Promise(async(resolve, reject) => {
            try {
                let errorLog = [];
                const BLOCK_HEIGHT = await this.getBlockHeight();
                for (var i = 0; i < BLOCK_HEIGHT; i++) {
                    const valid = await this.validateBlock(i);
                    if (!valid) {
                        errorLog.push(i)
                    };
                    let blockHash = await this.getBlock(i).hash;
                    let previousHash = await this.getBlock(i + 1).previousBlockHash;
                    if (blockHash !== previousHash) {
                        errorLog.push(i);
                    }
                }
                if (errorLog.length > 0) {
                    return resolve({
                        invalids: errorLog
                    });
                } else {
                    return resolve({
                        inavlids: null
                    })
                }
            } catch (err) {
                return reject({
                    error: {
                        message: 'Something went wrong when tried to validate the block',
                        main: err
                    }
                })
            }
        });
    }
}