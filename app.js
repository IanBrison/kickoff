var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({width: 1600, height: 1200});
  mainWindow.loadURL('file://' + __dirname + '/web/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
