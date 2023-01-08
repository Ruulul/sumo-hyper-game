const { BrowserWindow, app } = require('electron')
const { join } = require('path')

app.whenReady().then(async ()=>{
    var win = await createWindow()
    app.on('activate', async ()=>{
        if (BrowserWindow.getAllWindows().length === 0) win = await createWindow()
    })
})
app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, 'preload.js'),
        },
    })
    await win.loadFile('index.html')
    return win
}