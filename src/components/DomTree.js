class DomNode {
  constructor(name, children) {
    this.name = name
    this.children = children
  }
}

export class DomTree {
  constructor(rootDomNode) {
    this.rootDomNode = rootDomNode
  }
}

const bodyDomNode = new DomNode('body', null)
const testDomNode = new DomNode('test', null)
export const domTreeData = new DomTree(
  new DomNode('html', [bodyDomNode, testDomNode])
)
