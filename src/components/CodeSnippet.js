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

  restore() {
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

export const sampleCode = `<!DOCTYPE html>
<html>
    <head>
    <title>Web app lifecycle</title>
    <style>
        #first { color: green;}
        #second { color: red;}
    </style>
    </head>
    <body>
        <h1>head one</h1>
        <ul id="first"></ul>
        <script>
            function addMessage(element, message){
              var messageElement = document.createElement("li");
              messageElement.textContent = message;
              element.appendChild(messageElement);
            }
            addMessage(document.getElementById('first'), 'I am a li')
        </script>
    </body>
</html>`

export const codeSteps = [2, 7, 1, 1, 1, 8, 2]
