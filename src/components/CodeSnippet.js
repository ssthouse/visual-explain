export default class CodeSnippet {
  constructor(contentStr, stepArray) {
    this.contentStr = contentStr
    this.stepArray = stepArray
    this.initData()
  }

  initData() {
    this.rows = this.contentStr.split('\n')
    this.curStep = 0
  }

  stepForward() {
    if (this.curStep >= this.stepArray.length) {
      return
    }
    this.curStep += 1
  }

  stepBackword() {
    if (this.curStep <= 0) {
      return
    }
    this.curStep -= 1
  }

  /**
   * show content in current step
   */
  getCurContent() {
    this.getCurRows().join('\n')
  }

  getCurRows() {
    let curRowSum = 0
    for (let i = 0; i < this.curStep; i++) {
      curRowSum += this.stepArray[i]
    }
    return this.getAllRows().slice(0, curRowSum)
  }

  getAllRows() {
    return this.rows
  }
}
