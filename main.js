const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  })

  window.loadFile('./vtk-react-app/build/index.html')
}

app.whenReady().then(() => {
  createWindow();
})