// const electron = require("electron");
// // Importing powerMonitor from Main Process
// // Using remote Module
// const powerMonitor = electron.remote.powerMonitor;

// powerMonitor.on("suspend", () => {
//   console.log("The system is going to sleep");
// });

// powerMonitor.on("resume", () => {
//   console.log("The system is resuming");
// });

// powerMonitor.on("on-ac", () => {
//   console.log("The system is on AC Power (charging)");
// });

// powerMonitor.on("on-battery", () => {
//   console.log("The system is on Battery Power");
// });

// powerMonitor.on("shutdown", () => {
//   console.log("The system is Shutting Down");
// });

// powerMonitor.on("lock-screen", () => {
//   console.log("The system is about to be locked");
// });

// powerMonitor.on("unlock-screen", () => {
//   console.log("The system is unlocked");
// });

// const state = powerMonitor.getSystemIdleState(4);
// document.write("Current System State - ", state);

// function activity() {
//   const idle = powerMonitor.getSystemIdleTime();
//   document.write("Current System Idle Time - " + idle + "sec" + "<br></br>");

//   //
//   document.addEventListener(
//     "keydown",
//     (event) => {
//       const keyName = event.key;

//       if (keyName === "Control") {
//         // do not alert when only Control key is pressed.
//         return;
//       }

//       if (event.ctrlKey) {
//         // Even though event.key is not 'Control' (e.g., 'a' is pressed),
//         // event.ctrlKey may be true if Ctrl key is pressed at the same time.
//         console.log(`Combination of ctrlKey + ${keyName}`);
//       } else {
//         document.write(`Key pressed ${keyName}<br>`);
//       }
//     },
//     false
//   );

//   document.addEventListener(
//     "keyup",
//     (event) => {
//       const keyName = event.key;

//       // As the user releases the Ctrl key, the key is no longer active,
//       // so event.ctrlKey is false.
//       if (keyName === "Control") {
//         document.write("Control key was released");
//       }
//     },
//     false
//   );

//   //
//   //

//   //
// }
// setInterval(activity, 2000);

//preload.js

const { contextBridge, ipcRenderer } = require("electron")
// const electron = require("electron");

// const powerMonitor = electron.remote.powerMonitor;

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld("api", {
  request: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  response: (channel, func) => {
    // Strip event as it includes `sender` and is a security risk
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  },
})


// Importing powerMonitor from Main Process
// Using remote Module

// powerMonitor.on("suspend", () => {
//   console.log("The system is going to sleep");
// });