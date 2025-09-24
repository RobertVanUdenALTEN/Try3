const vscode = require('vscode');
const { spawn } = require('child_process');

function activate(context) {
  const handler = async (request, chatCtx, stream, token) => {
    // Example: run a Python script with the user prompt as an arg
    const py = spawn('python', [vscode.Uri.joinPath(context.extensionUri, 'worker.py').fsPath, request.prompt]);

    // stream Python stdout into the chat
    py.stdout.on('data', (buf) => stream.markdown(buf.toString()));
    py.stderr.on('data', (buf) => stream.markdown('**[stderr]** ' + buf.toString()));
    py.on('close', () => stream.progress('Done.'));

    // Optional: use the selected chat model too (combine LLM + Python tools)
    // const resp = await request.model.sendRequest(
    //   [vscode.LanguageModelChatMessage.User(request.prompt)], {}, token
    // );
    // for await (const chunk of resp.text) stream.markdown(chunk);
  };

  const participant = vscode.chat.createChatParticipant('myext.helper', handler);
  context.subscriptions.push(participant);
}
exports.activate = activate;
