// set (key, value) ^
// get (key) ^
// has (key) ^
// remove (key) ^
// length() ^
// clear() ^
// keys() ^
// values() ^
// entries() ^

class Node {
    constructor(value){
        this.value = value;
        this.nextNode = null;
    }
}

export class LinkedList {
    constructor(){
        this.size = 0;
        this.head = null;
    }

    append(value){ // set 
        let newNode = new Node(value);

        if (this.size === 0){
            this.head = newNode;
        } else {
            let currentNode = this.head;

            while (currentNode.nextNode){
                currentNode = currentNode.nextNode;
            }

            currentNode.nextNode = newNode;
        }
        this.size++;
    }

    atIndex(index){ // get 
        let currentNode = this.head;
        let currentIndex = 0;
        let totalSize = this.size;

        if (index >= totalSize || index < 0){
            return null;
        }
        while (currentIndex < index){
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        return currentNode;
    }

    contain(value){ // has
        let currentNode = this.head;
        let currentIndex = 0;
        let totalSize = this.size;

        if (this.size === 0) {
            return null;
        }
        while(currentIndex < totalSize){
            if (currentNode.value[0] === value){
                return {
                    currentIndex: currentIndex,
                    currentNode: currentNode,
                };
            } else {
                currentNode = currentNode.nextNode;
                currentIndex++;
            }
        }
        return null;
    }

    remove(value){
        let ifValueContains = this.contain(value);

        if(ifValueContains){
            let indexOfNodeToRemove = this.atIndex(ifValueContains.currentIndex);
            let previousNode = this.atIndex(ifValueContains.currentIndex - 1);

            previousNode.nextNode = indexOfNodeToRemove.nextNode;

            this.size--;
        } else {
            return null;
        }
    }

    clear(){ // clear the linkedList
        this.head = null;
        this.size = 0;
        return;
    }

    keys(){ // keys
        let keysArray = [];
        let currentNode = this.head;

        if (this.size === 0) {
            return null;
        }

        for(let i = 0; i < this.size; i++){
            keysArray.push(currentNode.value[0]);
            currentNode = currentNode.nextNode;
        }

        return keysArray;
    }

    values(){ // values
        let valuesArray = [];
        let currentNode = this.head;

        if (this.size === 0) {
            return null;
        }

        for(let i = 0; i < this.size; i++){
            valuesArray.push(currentNode.value[1]);
            currentNode = currentNode.nextNode;
        }

        return valuesArray;
    }

    entries(){ // entries
        let allItemsInTheList = [];
        let currentNode = this.head;

        if (this.size === 0) {
            return null;
        }

        for(let i = 0; i < this.size; i++){
            if (currentNode.nextNode === null){
                allItemsInTheList.push([currentNode.value[0], currentNode.value[1]]);
            } else {
                allItemsInTheList.push([currentNode.value[0], currentNode.value[1], ]);
            }
            currentNode = currentNode.nextNode;
        }

        return allItemsInTheList;
    }
}