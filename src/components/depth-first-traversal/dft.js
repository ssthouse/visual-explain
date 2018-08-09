export class Dft {
  constructor(rootNode, stepCallback) {
    this.rootNode = rootNode
    this.stepCallback = stepCallback
  }

  start() {
    if (!this.rootNode || !this.stepCallback) {
      return
    }
    const stack = [this.rootNode]
    while (stack.length !== 0) {
      const curNode = stack.pop()
      this.stepCallback(curNode)
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
      })
    }
  }
}

export class Node {
  constructor(value, childrenNodes = []) {
    this.value = value
    this.childrenNodes = []
  }

  addChild(childNode) {
    this.childrenNodes.push(childNode)
  }
}

export function constructTestData() {
  const rootNode = new Node(1, [])
  rootNode.addChild(new Node(2, [new Node(4, []), new Node(5, [])]))
  rootNode.addChild(new Node(3, [new Node(6, []), new Node(7, [])]))
  return rootNode
}
