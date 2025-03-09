const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronApi', {
  loadFile: () => ipcRenderer.invoke('loadVtiFile')
})