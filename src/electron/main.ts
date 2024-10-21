import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcMainHandle, isDev } from './utilits.js';
import { getStaticData, pollResources } from './resourceManeger.js';
import { getPreloadPath } from './pathResolver.js';





app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }

    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }else{
        mainWindow.loadFile(app.getAppPath( ) + "/dist-react/index.html");
    }

    pollResources(mainWindow);

    ipcMainHandle("getStaticData", ()=>{
        return getStaticData();
    });
});
