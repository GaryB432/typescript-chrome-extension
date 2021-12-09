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

function visitNode(callback: (a: Node) => void, node: Node) {
  if (node.nodeType !== node.TEXT_NODE) callback(node);
  if (node.firstChild) visitNode(callback, node.firstChild);
  if (node.nextSibling) visitNode(callback, node.nextSibling);
}

visitNode((e) => {
  console.log(e, e.nodeType, e.TEXT_NODE, '<<---');
}, document);

// visitNode((node: Node) => {
//   if (!node.hasChildNodes()) {
//     log(
//       (node instanceof HTMLElement ? 'yes' : node.textContent ?? 'wtf').concat(
//         '<-'
//       )
//     );
//     node.addEventListener('mouseenter', (e: Event) => {
//       if (e && e.target) {
//         if (e.target instanceof HTMLElement) {
//           e.target.style.color = 'purple';
//         }
//         log(e.type);
//       }
//     });
//     // if (node.textContent) {
//     //   // log(node.textContent.concat('<<') ?? 'tbd');
//     // } else {
//     //   log('nope');
//     // }
//   }
// }, document);

// function v(cb: (e: Element) => void, e: Element): void {
//   cb(e);
//   // for (const c of e.children) {
//   //   cb(c);
//   //   // if (c.hasChildNodes()) {
//   //   //   v(cb, c);
//   //   // }
//   // }
// }

// v((e) => {
//   log(e.nodeName);
// }, document.body);

// for (let node of document.body.children) {
//   log(node.nodeName); // shows all nodes from the collection
// }

// function visit(e: Element): void {
//   if (!e.parentElement) {
//     log(e.tagName);
//   }
//   if (e.hasChildNodes()) {
//     const c = e.firstChild;
//   }
// }

// visit(document.body);

// function getLeafNodes(master: Element) {
//   var nodes = Array.prototype.slice.call(master.getElementsByTagName('*'), 0);
//   var leafNodes = nodes.filter(function (elem) {
//     return !elem.hasChildNodes();
//   });
//   return leafNodes;
// }

// console.log(getLeafNodes(document.body));

// const a = document.querySelectorAll<Element>('*');
// for (const e of a) {
//   if (e instanceof HTMLElement) {
//     // if (!e.hasChildNodes()) {
//     // log(e.tagName + '<-');
//     // console.dir(e);
//     e.addEventListener(
//       'mouseenter',
//       (vv) => {
//         console.log(vv);
//         e.style.border = '1px solid red';
//         // vv.stopPropagation();
//       },
//       { capture: false }
//     );
//     // }
//   }
// }

log('Ready.');
