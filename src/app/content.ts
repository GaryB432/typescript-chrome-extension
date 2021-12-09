import { Message } from './types';

// document.body.innerHTML = "";

function addButton(name: string, cb: () => void) {
  const a = document.createElement('button');
  a.innerText = name;
  a.onclick = cb;
  document.body.appendChild(document.createElement('br'));
  document.body.appendChild(a);
}

function log(str: string) {
  console.log(str);
  logDiv.innerHTML += str + '<br>';
}

addButton('Clear logs', () => {
  logDiv.innerHTML = '';
});

addButton('Send message with delayed response', () => {
  const message: Message = { delayedResponse: true };
  chrome.runtime.sendMessage(message, (response) => {
    log('Background page responded: ' + response);
  });
});

addButton('Show counters', () => {
  const message: Message = { getCounters: true };
  chrome.runtime.sendMessage(message, (response) => {
    log('In-memory counter is: ' + response.counter);
    log('Persisted counter is: ' + response.persistentCounter);
  });
});

addButton('Set an alarm', () => {
  const message: Message = { setAlarm: true };
  chrome.runtime.sendMessage(message);
});

chrome.runtime.onMessage.addListener((msg, _, _sendResponse) => {
  log('Got message from background page: ' + msg);
});

const logDiv = document.createElement('div');
logDiv.style.border = '1px dashed black';
document.body.appendChild(document.createElement('br'));
document.body.appendChild(logDiv);

log('Ready.');
