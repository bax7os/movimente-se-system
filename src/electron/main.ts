import { app, BrowserWindow, ipcMain } from 'electron';
import { isDev } from './util.js';
import {  pollResources } from './resourceManeger.js';
import { getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';



app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }, 
       
    });
    

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }else{
        mainWindow.loadFile(app.getAppPath( ) + "/dist-react/index.html");
    }

    pollResources(mainWindow);

    createTray(mainWindow);
    handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
    let willClose = false;
  
    mainWindow.on('close', (e) => {
      if (willClose) {
        return;
      }
      e.preventDefault();
      mainWindow.hide();
      if (app.dock) {
        app.dock.hide();
      }
    });
  
    app.on('before-quit', () => {
      willClose = true;
    });
  
    mainWindow.on('show', () => {
      willClose = false;
    });
  }