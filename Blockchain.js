/**
 * Seminar 2.1 Blockchain primitive
 */

const SHA256 = require('ethereum-cryptography/sha256').sha256;
const utf8ToBytes = require('ethereum-cryptography/utils').utf8ToBytes;


class Block {
    constructor(data){
        this.data = data;
        this.previousHash = null;
    }

    toHash(){
        const hashBytes = utf8ToBytes(this.data + this.previousHash);
        return SHA256(hashBytes);
    }
}


class Blockchain {
    constructor() {
        const genesisBlock = new Block("Genesis block");
        this.chain = [genesisBlock];
    }

    addBlock(block){
        const previousBlock = this.chain[this.chain.length - 1];
        block.previousHash = previousBlock.toHash();
        this.chain.push(block);
    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            const currentHashHex = Buffer.from(currentBlock.previousHash).toString('hex');
            const expectedHashHex = Buffer.from(previousBlock.toHash()).toString('hex');

            if (currentHashHex !== expectedHashHex) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { Block, Blockchain };