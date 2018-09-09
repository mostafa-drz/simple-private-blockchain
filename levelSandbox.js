/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key, value) {
    return new Promise((resolve, reject) => {
        db.put(key, value, function(err) {
            if (err) {
                reject({
                    error: {
                        message: 'Block ' + key + ' submission failed',
                        main: err
                    }
                });
            } else {
                resolve(value);
            }
        })
    });

}

// Get data from levelDB with key
function getLevelDBData(key) {
    return new Promise((resolve, reject) => {
        db.get(key, function(err, value) {
            if (err) {
                reject({
                    error: {
                        message: 'Not Found!',
                        main: err
                    }
                })
            }
            resolve(value);
        })
    });

}

// Add data to levelDB with value
function addDataToLevelDB(value) {
    return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream().on('data', function(data) {
            i++;
        }).on('error', function(err) {
            reject({
                error: {
                    message: 'Unable to read data stream!',
                    main: err
                }
            })
        }).on('close', function() {
            console.log('Block #' + i);
            resolve(addLevelDBData(i, value));
        });
    });

}

function getNumberOfRecordsInDB() {
    return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream().on("data", function(data) {
            i++;
        }).on("error", function(err) {
            reject({
                error: {
                    message: 'Could not get the number of records',
                    main: err
                }
            })
        }).on("close", function() {
            resolve(i);
        });
    });

}
/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


// (function theLoop(i) {
//     setTimeout(function() {
//         addDataToLevelDB('Testing data');
//         if (--i) theLoop(i);
//     }, 100);
// })(10);

module.exports = {
    getLevelDBData,
    addDataToLevelDB,
    getNumberOfRecordsInDB
}