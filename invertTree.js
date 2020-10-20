class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

class ToyTree {
    
    constructor() {
        this.root = null
        this.size = 0
    }

    push(val) {
        //does not accept duplicate values
        let newNode = new Node(val)
        if (this.size === 0) {
            this.root = newNode
            this.size++
        } else {
            let currNode = this.root
            while(true) {
                if (val === currNode.val) {
                    break
                } else if (val < currNode.val) {
                    if (currNode.left) {
                        currNode = currNode.left
                    } else {
                        currNode.left = newNode
                        this.size++
                        break
                    }
                } else {
                    if (currNode.right) {
                        currNode = currNode.right
                    } else {
                        currNode.right = newNode
                        this.size++
                        break
                    }
                }
            }
        }
    }

    getRightMostVal() {
        if (!this.root) return undefined
        let currNode = this.root
        while(currNode.right) {
            currNode = currNode.right
        }
        return currNode.val
    }

    getLeftMostVal(){
        if (!this.root) return undefined
        let currNode = this.root
        while(currNode.left) {
            currNode = currNode.left
        }
        return currNode.val
    }

    breadthFirst() {
        let values = []
        let q = [this.root]
        while (q.length) {
            let currNode = q.shift()
            values.push(currNode.val)
            if (currNode.left) q.push(currNode.left)
            if (currNode.right) q.push(currNode.right)
        }
        return values
    }

    depthFirstPreOrder() {
        if (!this.root) return []
        let values = []
        function preTraverse(node) {
            values.push(node.val)
            if (node.left) preTraverse(node.left)
            if (node.right) preTraverse(node.right)
        }
        preTraverse(this.root)
        return values
    }
    
    depthFirstInOrder() {
        if (!this.root) return []
        let values = []
        function inTraverse(node) {
            if (node.left) inTraverse(node.left)
            values.push(node.val)
            if (node.right) inTraverse(node.right)
        }
        inTraverse(this.root)
        return values
    }

    depthFirstPostOrder() {
        if (!this.root) return []
        let values = []
        function postTraverse(node) {
            if (node.left) postTraverse(node.left)
            if (node.right) postTraverse(node.right)
            values.push(node.val)
        }
        postTraverse(this.root)
        return values
    }
    
}

function levelOrder(node) {
    if (!node) return []
    let values = []
    let row = []
    let q = [[node, 0]]
    while (q.length) {
        let [currNode, level] = q.shift()
        if (currNode.left) q.push([currNode.left, level + 1])
        if (currNode.right) q.push([currNode.right, level + 1])
        row.push(currNode.val)
        if (q.length && level < q[0][1]) {
            values.push(row)
            row = []
        }
    }
    values.push(row)
    return values
}


function sumNumbers(root) {
    if (!root) return 0
    if (!(root.left || root.right)) return root.val
    
    function rootToLeafNums(root) {
        if (!root) return ['']
        let nums = []
        let lNums = rootToLeafNums(root.left)
        let rNums = rootToLeafNums(root.right)
        let self = String(root.val)
        if (lNums[0] !== '') {
            for (let el of lNums) {
                
                nums.push(self + el)
            }
        }
        if (rNums[0] !== '') {
            for (let el of rNums) {
                
                nums.push(self + el)
            }
        }
        if (nums.length === 0) return [self]
        return nums
    }
    
    
    let numStrs = rootToLeafNums(root)
    const ints = numStrs.map(s => parseInt(s))
    return ints.reduce((a,c) => a+c)

};

function invert(tree) {
    // returns new ToyTree
    function helper(node) {
        if (!node) return null
        let newRoot = new Node(node.val)
        let newLeft = helper(node.right)
        let newRight = helper(node.left)

        newRoot.left = newLeft
        newRoot.right = newRight
        return newRoot
    }
    
    let newTree = new ToyTree
    newTree.root = helper(tree.root)
    newTree.size = tree.size
    return newTree
}



const arr = [5,3,1,4,2,6,8,7,9]
let testTr = new ToyTree

arr.forEach(int => testTr.push(int))