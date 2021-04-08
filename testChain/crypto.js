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

function isValidChain(blockchain){
    let prev_hash = 0;
    let violation_flag = false;
    blockchain.forEach(block => {
        if (block.index > 0){
            if (prev_hash !== block.precedingHash){
                console.error(`VIOLATED @ BLOCK ${block.index}`)
                violation_flag = true;
            }
        }
        prev_hash = block.hash;
        });
    return !(violation_flag);
}

function manipChain(arg_blockchain){
    let blockchain = arg_blockchain["blockchain"];
    let to_manip = Math.floor(Math.random() * blockchain.length);
    blockchain[to_manip].hash = "xyz";
    console.error("Modified blockchain");
}

module.exports = {
    cryptBlock: cryptBlock,
    cryptBlockchain: cryptBlockchain,
    jsonData: jsonData,
    isValidChain: isValidChain,
    manipChain: manipChain
}

