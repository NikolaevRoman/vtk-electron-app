const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const {readFile} = require("fs").promises;

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js')
    }
  })

  window.loadFile('./vtk-react-app/build/index.html')
}

app.whenReady().then(() => {
  createWindow();
})


ipcMain.handle("loadVtiFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  const arrayBuffer = await readFile(filePaths[0]);
  return arrayBuffer;
});