import { Message } from './types';

// document.body.innerHTML = "";

const uid = 'ssdnv3h';

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

function visitNode(callback: (a: Node) => void, node: Node) {
  callback(node);
  if (node.firstChild) visitNode(callback, node.firstChild);
  if (node.nextSibling) visitNode(callback, node.nextSibling);
}

const allElements: HTMLElement[] = [];
visitNode((e) => {
  if (e instanceof HTMLElement) {
    allElements.push(e);
  }
}, document.body);

for (const ele of allElements.filter((e) => e.childElementCount === 0)) {
  ele.addEventListener('mouseenter', (mev) => {
    const target = mev.target as HTMLElement;
    target.setAttribute(uid, target.style.border);
    target.style.border = '1px solid blue';
  });
  ele.addEventListener('mouseleave', (mev) => {
    const target = mev.target as HTMLElement;
    target.style.border = target.getAttribute(uid) ?? '';
  });
}

log('Ready.');
