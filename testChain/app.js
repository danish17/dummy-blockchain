const crypto = require('./crypto');

let cryptBlock = crypto.cryptBlock;
let cryptBlockchain = crypto.cryptBlockchain;
let jsonData = crypto.jsonData;

function dummyOperations(verbose = false){
    var dummyBlockchain = new cryptBlockchain();
    dummyBlockchain.addNewBlock(new cryptBlock(jsonData("danish", "musk", 1000)));
    dummyBlockchain.addNewBlock(new cryptBlock(jsonData("musk", "danish", 10000)));
    dummyBlockchain.addNewBlock(new cryptBlock(jsonData("musk", "danish", 5000)));
    if (verbose){
        console.log(JSON.stringify(dummyBlockchain, null, 6));
    }
    console.table(dummyBlockchain["blockchain"])
}

dummyOperations(true);