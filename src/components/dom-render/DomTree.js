class DomNode {
  constructor(name, children) {
    this.name = name
    this._children = children
    this.visible = false
    this.key = Math.random() * 1000
  }

  addChild(childDomNode) {
    if (!this._children) {
      this._children = []
    }
    this._children.push(childDomNode)
  }

  filterChildren() {
    if (!this._children) {
      return
    }
    this.children = this._children.filter(child => child.visible)
    if (!this.children) {
      return
    }
    this.children.forEach(child => child.filterChildren())
  }

  hide(nodeName) {
    if (this.name === nodeName) {
      this.visible = false
      return
    }
    if (!this._children) {
      return
    }
    this._children.forEach(child => child.hide(nodeName))
  }

  show(nodeName) {
    if (this.name === nodeName) {
      this.visible = true
      return
    }
    if (!this._children) {
      return
    }
    this._children.forEach(child => child.show(nodeName))
  }
}

export class DomTree {
  constructor(rootDomNode) {
    this.rootDomNode = rootDomNode
  }

  restore() {
    this.rootDomNode.restore()
  }

  hide(nodeName) {
    this.rootDomNode.hide(nodeName)
  }

  show(nodeName) {
    this.rootDomNode.show(nodeName)
  }

  getData() {
    if (this.rootDomNode.visible === false) {
      return null
    }
    this.rootDomNode.filterChildren()
    return this.rootDomNode
  }
}

const htmlDomNode = new DomNode('html', null)
const bodyDomNode = new DomNode('body', null)
htmlDomNode.addChild(bodyDomNode)
const h1DomNode = new DomNode('h1', null)
const ulDomNode = new DomNode('ul', null)
bodyDomNode.addChild(h1DomNode)
bodyDomNode.addChild(ulDomNode)
const liDomNode = new DomNode('li', null)
ulDomNode.addChild(liDomNode)
export const domTreeData = new DomTree(htmlDomNode)
