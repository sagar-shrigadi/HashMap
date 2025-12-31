import { LinkedList } from './linkedLIst.js';


function stringToIntHash(s, capacity){
    let hashcode = 0;

    let primeNum = 31;
    for (let i = 0; i < s.length; i++){
        hashcode = (hashcode * primeNum + s.charCodeAt(i)) % capacity;
    }

    return hashcode;
}

class Hashmap {
    constructor(size = 16){
        this.loadFactor = 0.75;
        this.capacity = size;
        this.size = 0;
        this.dataArray = new Array(this.capacity);
    }

    hash(key){
        let hashcode = stringToIntHash(key, this.capacity);
        return hashcode;
    }

    resize(){
        let allPairs = this.entries(); // store all the current pairs of the hashmap before creating new array

        this.capacity = this.capacity * 2;

        this.dataArray = new Array(this.capacity);
        this.size = 0;

        allPairs.forEach((pair) => {
            this.set(pair[0], pair[1]);
        });
    }

    set(key, value){
        let index = stringToIntHash(key, this.capacity);

        if (!this.dataArray[index]){ // if empty at this index, create new linked list
            this.dataArray[index] = new LinkedList();
        }

        const bucket = this.dataArray[index];

        let currentNode = bucket.head;

        // check to see if the key already exists, if it does update its value
        while (currentNode) {
            if (currentNode.value[0] === key){
                currentNode.value[1] = value;
                return;
            } 
            currentNode = currentNode.nextNode;
        }

        bucket.append([key, value]); // add the key and value pair if not found in list above
        this.size++;

        // growth function

        if (this.size > (this.capacity * this.loadFactor)) {
            this.resize();
        }
    }

    get(key){ 
        let index = stringToIntHash(key, this.capacity);

        const bucket = this.dataArray[index];

        if (!bucket){
            return null;
        }

        let keyContains = bucket.contain(key);

        if (!keyContains){
            return null; 
        } 

        return keyContains.currentNode.value[1];

    }

    has(key){
        let index = stringToIntHash(key, this.capacity);

        const bucket = this.dataArray[index];

        if (!bucket){
            return false;
        }

        let keyContains = bucket.contain(key);

        if (keyContains !== null){
            return true; 
        }
        return false;
    }

    remove(key){
        let index = stringToIntHash(key, this.capacity);

        let bucket = this.dataArray[index];

        if (!bucket) {
            return false;
        }

        let keyToRemove = bucket.remove(key);

        if (keyToRemove === null) {
            return false;
        }
        
        this.size--;
        return true;
    }

    length(){
        return this.size;
    }

    clear(){
        this.dataArray = new Array(this.capacity);
        this.size = 0;
    }

    keys(){
        let keysArray = [];
        this.dataArray.forEach((bucket) => {
            keysArray.push(...bucket.keys());
        });
        return keysArray;
    }

    values(){
        let valuesArray = [];
        this.dataArray.forEach((bucket) => {
            valuesArray.push(...bucket.values());
        });
        return valuesArray;
    }

    entries(){
        let entriesArray = [];
        this.dataArray.forEach((bucket) => {
            entriesArray.push(...bucket.entries());
        });
        return entriesArray;
    }
}