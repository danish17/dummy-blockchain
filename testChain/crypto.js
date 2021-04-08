const SHA256 = require('crypto-js/sha256');
var index = 0;

class cryptBlock{
    constructor(data, precedingHash=" "){
     this.index = index++;
     this.timestamp = Date.now();
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();     
    }
    
    computeHash(){
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }   
}

class cryptBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];     
    }
    
    startGenesisBlock(){
        return new cryptBlock("Initial Block in the Chain", "0");
    }
    
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.blockchain.push(newBlock);
    }
}

function jsonData(sender, receiver, quantity){
    let toReturnJSON = {
        sender: sender,
        receiver: receiver,
        quantity: quantity
    };

    return JSON.stringify(toReturnJSON);
}

module.exports = {
    cryptBlock: cryptBlock,
    cryptBlockchain: cryptBlockchain,
    jsonData: jsonData
}

