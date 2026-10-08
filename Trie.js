/**
 * Seminar 2.5 Simple Trie
 */


class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let current = this.root;

        for (const letter of word) {
            if (!current.children[letter]) {
                current.children[letter] = new TrieNode(letter);
            }
            current = current.children[letter];
        }

        current.isWord = true;
    }

    hasNode(word){
        let current = this.root;

        for (const letter of word) {
            if (!current.children[letter]) {
                return false;
            }
            current = current.children[letter];
        }

        return current.isWord === true;
    }

    getAllNodes(){
        const result = [];

        const traverse = (node, prefix) => {
            if (node.isWord) {
                result.push(prefix);
            }
            for (const letter in node.children) {
                traverse(node.children[letter], prefix + letter);
            }
        };

        traverse(this.root, '');
        return result;
    }
}

module.exports = { Trie };