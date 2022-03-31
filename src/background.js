

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const path = require('path');
const electron = require("electron");
// const powerMonitor = electron.remote.powerMonitor;
const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      preload: path.join(__dirname, "preload.js"),

      
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });
  

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");

    win.loadURL(
      isDev
      ? "http://localhost:3000"
      :`file://${path.join(__dirname,"app://./index.html")}`)
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}


// const electron = require("electron");
// Importing powerMonitor from Main Process
// Using remote Module
// const powerMonitor = electron.remote.powerMonitor;
// app.on('ready', () => {
//   electron.powerMonitor.on('suspend', () => {
//     console.log('The system is going to sleep')
//   })
// })

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
