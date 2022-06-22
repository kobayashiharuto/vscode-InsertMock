import * as vscode from "vscode";

export class InsertMock {
  public custom() {
    const options: vscode.InputBoxOptions = {
      placeHolder: "Dataset Name (empty: default)",
      prompt: "Input dataset name",
    };
    const input = vscode.window.showInputBox(options);

    if (!input) {
      return;
    }

    input.then(function (setName: string | undefined) {
      InsertMock.insert(setName);
    });
  }

  public default() {
    InsertMock.insert(undefined);
  }

  private static insert(setName: string | undefined) {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined) {
      return;
    }
    const selections = activeTextEditor.selections;
    const randomStrs = InsertMock.generateRandomStr(setName, selections.length);

    if (randomStrs instanceof Error) {
      vscode.window.showInformationMessage(randomStrs.message);
      return;
    }

    activeTextEditor.edit((editBuilder) => {
      for (let i = 0; i < selections.length; i++) {
        editBuilder.replace(selections[i], randomStrs[i]);
      }
    });
  }

  private static generateRandomStr(
    setName: string | undefined,
    generateNum: number
  ) {
    let setName_ = "";

    if (setName === undefined || setName === "") {
      setName_ = "default";
    } else {
      setName_ = setName;
    }

    let names =
      vscode.workspace.getConfiguration("insertMock")["mockDataset"][setName_];

    if (names === undefined) {
      return new Error(`Dataset: ${setName_} does not exist.`);
    }
    if (!(names instanceof Array)) {
      return new Error(
        `Dataset: ${setName_} is not array.\nPlease specify an array of strings.`
      );
    }
    if (names.length === 0) {
      return new Error(`Dataset: ${setName_} is empty.`);
    }

    const needShuffle =
      vscode.workspace.getConfiguration("insertMock")["needShuffle"] ?? false;
    if (needShuffle) {
      for (let i = names.length; 1 < i; i--) {
        const j = Math.floor(Math.random() * i);
        [names[j], names[i - 1]] = [names[i - 1], names[j]];
      }
    }

    const results: string[] = [];
    for (let i = 0; i < generateNum; i++) {
      results.push(names[i % names.length]);
    }
    return results;
  }
}
