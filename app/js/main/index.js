const {ipcMain, dialog} = require('electron'),
    upcover = require('../utils/upcover');

ipcMain.on('open-file-dialog', (event, cookies) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (file) => {
        if (file) {
            upcover(file, cookies);
            event.sender.send('image-chosen', file);
        }
    });
})