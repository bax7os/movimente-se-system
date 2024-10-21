import { app, BrowserWindow } from 'electron';



type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadFile(app.getAppPath( ) + "/dist-react/index.html");
});