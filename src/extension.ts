import * as vscode from "vscode";
import { InsertMock } from "./Inserter";

export function activate(context: vscode.ExtensionContext) {
  const inserter = new InsertMock();
  const disposableDefault = vscode.commands.registerCommand(
    "extension.insert-mock.default",
    () => {
      inserter.default();
    }
  );
  const disposableCustom = vscode.commands.registerCommand(
    "extension.insert-mock.custom",
    () => {
      inserter.custom();
    }
  );

  context.subscriptions.push(disposableDefault);
  context.subscriptions.push(disposableCustom);
}

export function deactivate() {}
