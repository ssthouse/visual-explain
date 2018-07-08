import { domTreeData } from './DomTree'

export default class CodeSnippet {
  constructor(contentStr, stepArray, domTreeData) {
    this.contentStr = contentStr
    this.stepArray = stepArray
    this.domTreeData = domTreeData
    this.initData()
  }

  initData() {
    this.rows = this.contentStr.split('\n')
    this.curStep = -1
  }

  restore() {
    this.curStep = -1
    this.hideAll()
  }

  hideAll() {
    this.stepArray.forEach(stepItem => {
      this.domTreeData.hide(stepItem['nodeName'])
    })
  }

  stepForward() {
    if (this.curStep >= this.stepArray.length - 1) {
      return
    }
    this.curStep += 1
    this.domTreeData.show(this.stepArray[this.curStep]['nodeName'])
  }

  stepBackword() {
    if (this.curStep <= -1) {
      return
    }
    this.curStep -= 1
    this.domTreeData.hide(this.stepArray[this.curStep + 1]['nodeName'])
  }

  isLastStep() {
    if (this.curStep >= this.stepArray.length - 1) {
      return true
    }
    return false
  }

  /**
   * show content in current step
   */
  getCurContent() {
    this.getCurRows().join('\n')
  }

  getCurRows() {
    let curRowSum = 0
    for (let i = 0; i <= this.curStep; i++) {
      curRowSum += this.stepArray[i]['count']
    }
    return this.getAllRows().slice(0, curRowSum)
  }

  // TODO
  getCurDomTreeData() {
    return this.domTreeData.getData()
  }

  getAllRows() {
    return this.rows
  }
}

export const sampleCode = `<!DOCTYPE html>
<html>
    <head>
    <title>Web app lifecycle</title>
    <style>
        #list { color: green;}
        #second { color: red;}
    </style>
    </head>
    <body>
        <h1>head one</h1>
        <ul id="list"></ul>
        <script>
            var liElement = document.createElement("li");
            liElement.textContent = 'I am a li';
            document.getElementById('list').appendChild(liElement);
        </script>
    </body>
</html>`

export const codeSteps = [
  { count: 2, nodeName: 'html' },
  { count: 7, nodeName: '' },
  { count: 1, nodeName: 'body' },
  { count: 1, nodeName: 'h1' },
  { count: 1, nodeName: 'ul' },
  { count: 5, nodeName: 'li' },
  { count: 2, nodeName: '' }
]

export const codeSnippet = new CodeSnippet(sampleCode, codeSteps, domTreeData)
